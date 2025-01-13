export interface IMovieTrending {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_languages: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TrendingType {
  page: number;
  results: Array<IMovieTrending>;
  total_pages: number;
  total_results: number;
}

interface IMovieGenre {
  id: number;
  name: string;
}

export interface IMovieFilters {
  query?: string;
  genre?: IMovieGenre;
  rating?: number;
  release_date?: string;
}
