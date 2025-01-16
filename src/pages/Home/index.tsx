import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getMoviesWithFilters, getTrending } from "@/services/movies";
import { IMovieFilters, IMovieTrending } from "@/types/movies";
import { FilterOptions } from "./components/FilterOptions";
import { ImageCard } from "@/components/ImageCard";
import { Loader } from "@/components/Loader";
import { ErrorComponent } from "@/components/Error";
import { Pagination } from "./components/Pagination";
import "./index.scss";

export function Home() {
  const [localFilters, setLocalFilters] = useState<IMovieFilters | undefined>(
    undefined
  );
  const [currentMovies, setCurrentMovies] = useState<
    IMovieTrending[] | undefined
  >(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const navigate = useNavigate();
  console.log("currentPage HOME", currentPage);

  const {
    data: trendingData,
    isLoading: isTrendingLoading,
    isFetching: isFetchingTrending,
    error: errorTrending,
    isError: isTrendingError,
  } = useQuery({
    queryKey: ["trendingMovies", Math.ceil(currentPage / 2)],
    queryFn: () => getTrending(currentPage),
    refetchOnWindowFocus: false,
  });

  const {
    data: filteredData,
    isFetching: isFiltersLoading,
    error: errorFilters,
    isError: isFiltersError,
  } = useQuery({
    queryKey: ["filteredMovies", localFilters],
    queryFn: () => getMoviesWithFilters(localFilters!, currentPage),
    enabled: Object.values(localFilters || {}).length != 0,
    refetchOnWindowFocus: false,
  });

  const isLoading = isTrendingLoading || isFiltersLoading || isFetchingTrending;
  const isError = isTrendingError || isFiltersError;

  function handleFiltersChange(newFilters: IMovieFilters) {
    setLocalFilters(newFilters);
  }

  const startIndex = currentPage % 2 === 1 ? 0 : 10;
  const endIndex = startIndex + 10;
  const moviesToDisplay = currentMovies?.slice(startIndex, endIndex);
  const showPagination = currentMovies && currentMovies.length >= 10;

  console.log("trendingData", trendingData);
  console.log("MOVIES TO DISPLAY", moviesToDisplay);

  useEffect(() => {
    if (trendingData) {
      setCurrentMovies(trendingData.results);
      setTotalResults(trendingData.total_results);
    }
  }, [trendingData]);

  useEffect(() => {
    if (filteredData) {
      setCurrentMovies(filteredData.results);
      setTotalResults(filteredData.total_results);
    }
  }, [filteredData]);

  if (isError) {
    return <ErrorComponent error={errorTrending || errorFilters} />;
  }

  return (
    <main className="home_container">
      <FilterOptions onFiltersChange={handleFiltersChange} />
      <br />

      {isLoading ? (
        <Loader />
      ) : moviesToDisplay && moviesToDisplay?.length > 0 ? (
        <>
          <div className="home_movies">
            {moviesToDisplay.map((movie) => (
              <ImageCard
                key={movie.id}
                image_path={movie.poster_path}
                movie_genres={movie.genre_ids}
                movie_name={movie.title}
                rating={movie.vote_average}
                onClick={() => {
                  navigate(`/movie/${movie.id}`);
                }}
              />
            ))}
          </div>
          {showPagination && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total_results={totalResults}
            />
          )}
        </>
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
}
