interface ICompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ICountries {
  iso_3166_1: string;
  name: string;
}

interface ISpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: Array<IMovieGenre>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<ICompany>;
  production_countries: Array<ICountries>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<ISpokenLanguage>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: IMovieVideos;
  vote_average: number;
  vote_count: number;
}

export interface IMovieVideos {
  results: Array<{
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: string;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
  }>;
}

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
}
