import { useEffect, useState } from "react";

import { getMoviesWithFilters, getTrending } from "@/services/movies";
import { IMovieFilters, IMovieTrending } from "@/types/movies";
import { FilterOptions } from "./components/FilterOptions";
import "./index.scss";
import { Card } from "@/components/Card";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentMovies, setCurrentMovies] = useState<
    Array<IMovieTrending> | undefined
  >(undefined);
  const navigate = useNavigate();

  function handleFiltersChange(newFilters: IMovieFilters) {
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

  function handleMovieCardClick(movie_id: number) {
    navigate(`/movie/${movie_id}`);
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
    <main className="home_container">
      <FilterOptions onFiltersChange={handleFiltersChange} />
      <br />
      {isLoading && <p>Carregando...</p>}

      {!isLoading && currentMovies && (
        <div className="home_movies">
          {currentMovies.map((movie) => (
            <Card
              key={movie.id}
              image_path={movie.backdrop_path}
              movie_genres={movie.genre_ids}
              movie_name={movie.title}
              rating={movie.vote_average}
              onClick={() => {
                handleMovieCardClick(movie.id);
              }}
            />
          ))}
        </div>
      )}
      {!isLoading && !currentMovies && (
        <div className="home_empty">
          <p>Não encontramos nada :(</p>
          <p>Tente alterar os filtros para novos resultados</p>
        </div>
      )}
    </main>
  );
};
