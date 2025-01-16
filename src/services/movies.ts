import api from "../config/api";
import { ISuccessfulMoviesResponse } from "../types/api";
import { IMovieDetails, IMovieFilters, IMovieTrending } from "@/types/movies";
import { applyLocalFilters } from "../functions/applyLocalFilters";

const getPageForApi = (page: number) => {
  return Math.ceil(page / 2);
};

export async function getTrending(
  currentPage: number
): Promise<ISuccessfulMoviesResponse> {
  const response = await api.get<ISuccessfulMoviesResponse>(
    "movie/now_playing",
    {
      params: {
        language: "pt-BR",
        page: getPageForApi(currentPage),
      },
    }
  );
  return response.data;
}

export async function getMoviesWithFilters(
  filters: IMovieFilters,
  currentPage: number
): Promise<ISuccessfulMoviesResponse> {
  const { release_date, query, genre, rating } = filters;

  const params = Object.entries({
    language: "pt-BR",
    "vote_average.gte": rating,
    with_genres: genre?.id,
    year: release_date,
    page: getPageForApi(currentPage),
  }).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string | number>);

  if (query) {
    params.query = query;
    const response = await api
      .get<ISuccessfulMoviesResponse>("search/movie", { params })
      .then((response) => response.data);

    const filteredResults = applyLocalFilters(response.results, filters);
    return { ...response, results: filteredResults };
  } else {
    const response = await api.get<ISuccessfulMoviesResponse>(
      "discover/movie",
      { params }
    );
    return response.data;
  }
}

export async function getMovieDetails(
  movie_id: string
): Promise<IMovieDetails> {
  const response = await api.get<IMovieDetails>(`movie/${movie_id}`, {
    params: {
      language: "pt-BR",
      append_to_response: "videos",
    },
  });

  return response.data;
}
