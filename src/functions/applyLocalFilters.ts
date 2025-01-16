import { IMovieFilters, IMovieTrending } from "@/types/movies";

export function applyLocalFilters(
  movies: Array<IMovieTrending>,
  filters: IMovieFilters
): Array<IMovieTrending> {
  const { genre, rating } = filters;

  return movies.filter((movie) => {
    const matchesGenre = genre ? movie.genre_ids?.includes(genre.id) : true;
    const matchesRating = rating ? movie.vote_average >= rating : true;

    return matchesGenre && matchesRating;
  });
}
