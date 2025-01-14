import {
  IMovieDetails,
  IMovieGenre,
  IMovieTrending,
  IMovieVideos,
} from "./movies";

export interface ISuccessfulMoviesResponse {
  page: number;
  results: Array<IMovieTrending>;

  total_pages: number;
  total_results: number;
}

export interface ISuccessfulGenreResponse {
  genres: Array<IMovieGenre>;
}
