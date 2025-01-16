import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { getGenres } from "@/services/genres";
import { IMovieGenre } from "@/types/movies";

const GenreContext = createContext<Array<IMovieGenre>>(
  [] as unknown as Array<IMovieGenre>
);

export function GenreProvider({ children }: PropsWithChildren) {
  const [genres, setGenres] = useState<Array<IMovieGenre>>([]);

  useEffect(() => {
    const storedGenres = localStorage.getItem("@cubos-movies/genres");

    if (storedGenres) {
      setGenres(JSON.parse(storedGenres));
    } else {
      getGenres()
        .then((response) => {
          if ("genres" in response) {
            setGenres(response.genres);
            localStorage.setItem(
              "@cubos-movies/genres",
              JSON.stringify(response.genres)
            );
          }
        })
        .catch((err) => {
          console.error("Error fetching genres: ", err);
        });
    }
  }, []);

  return (
    <GenreContext.Provider value={genres}>{children}</GenreContext.Provider>
  );
}

export function useGenres() {
  return useContext(GenreContext);
}
