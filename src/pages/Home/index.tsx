import { useEffect, useState } from "react";

import { getMoviesWithFilters, getTrending } from "@/services/movies";
import { IMovieFilters, IMovieTrending } from "@/types/movies";
import { FilterOptions } from "./components/FilterOptions";
import "./index.scss";
import { ImageCard } from "@/components/ImageCard";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/Loader";
import { ErrorComponent } from "@/components/Error";

export const Home = () => {
  const [localFilters, setLocalFilters] = useState<IMovieFilters | null>(null);
  const [currentMovies, setCurrentMovies] = useState<
    IMovieTrending[] | undefined
  >(undefined);
  const navigate = useNavigate();

  const {
    data: trendingData,
    isLoading: isTrendingLoading,
    error: errorTrending,
    isError: isTrendingError,
  } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: getTrending,
    refetchOnWindowFocus: false,
  });

  const {
    data: filteredData,
    isFetching: isFiltersLoading,
    error: errorFilters,
    isError: isFiltersError,
  } = useQuery({
    queryKey: ["filteredMovies", localFilters],
    queryFn: () => getMoviesWithFilters(localFilters!),
    enabled: !!localFilters,
    refetchOnWindowFocus: false,
  });

  const isLoading = isTrendingLoading || isFiltersLoading;
  const isError = isTrendingError || isFiltersError;

  function handleFiltersChange(newFilters: IMovieFilters) {
    setLocalFilters(newFilters);
  }

  useEffect(() => {
    if (trendingData) {
      setCurrentMovies(trendingData.results);
    }

    if (filteredData) {
      setCurrentMovies(filteredData.results);
    }
  }, [trendingData, filteredData]);

  if (isError) {
    return <ErrorComponent error={errorTrending || errorFilters} />;
  }

  return (
    <main className="home_container">
      <FilterOptions onFiltersChange={handleFiltersChange} />
      <br />

      {isLoading ? (
        <Loader />
      ) : currentMovies && currentMovies?.length > 0 ? (
        <div className="home_movies">
          {currentMovies.map((movie) => (
            <ImageCard
              key={movie.id}
              image_path={movie.backdrop_path}
              movie_genres={movie.genre_ids}
              movie_name={movie.title}
              rating={movie.vote_average}
              onClick={() => {
                navigate(`/movie/${movie.id}`);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="error_container">
          <p className="error_text">Não encontramos nada :(</p>
          <p className="error_text__small">
            Tente alterar os filtros para novos resultados
          </p>
        </div>
      )}
    </main>
  );
};
