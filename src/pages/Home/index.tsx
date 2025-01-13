import { getMoviesWithFilters, getTrending } from "@/services/movies";
import { IMovieFilters, IMovieTrending } from "@/types/movies";
import { useEffect, useState } from "react";
import { SortOptions } from "./components/SortOptions";

export const Home = () => {
  const [filters, setFilters] = useState<IMovieFilters>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentMovies, setCurrentMovies] = useState<
    Array<IMovieTrending> | undefined
  >(undefined);

  function handleFiltersChange(newFilters: IMovieFilters) {
    setFilters(newFilters);
    setIsLoading(true);
    getMoviesWithFilters(newFilters)
      .then((response) => {
        setIsLoading(false);
        if ("results" in response) {
          console.log("results", response.results);
          setCurrentMovies(response.results);
        } else {
          setCurrentMovies([]);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Erro inesperado: ", err);
      });
  }

  useEffect(() => {
    getTrending()
      .then((response) => {
        if ("results" in response) {
          setCurrentMovies(response.results);
        }
      })
      .catch((err) => {
        console.error("Erro inesperado: ", err);
      });
  }, []);

  return (
    <>
      <SortOptions onFiltersChange={handleFiltersChange} />
      <br />
      {isLoading && <p>Carregando...</p>}
      {!isLoading &&
        currentMovies &&
        currentMovies.map((movie) => <p key={movie.id}>{movie.title}</p>)}
    </>
  );
};
