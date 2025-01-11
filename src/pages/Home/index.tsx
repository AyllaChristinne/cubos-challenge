import { Header } from "@/components/Header";
import { getTrending } from "@/services/getTrending";
import { IMovieTrending } from "@/types/movies";
import { useEffect, useState } from "react";

export const Home = () => {
  const [currentMovies, setCurrentMovies] = useState<
    Array<IMovieTrending> | undefined
  >(undefined);

  useEffect(() => {
    getTrending()
      .then((response) => {
        if ("results" in response) {
          setCurrentMovies(response.results);
        }
      })
      .catch((err) => {
        console.error("Errcx o inesperado: ", err);
      });
  }, []);

  return (
    <>
      <Header />
      <br />
      {currentMovies &&
        currentMovies.map((movie) => <p key={movie.id}>{movie.title}</p>)}
    </>
  );
};
