import api from "./api";
import { ISuccessfulMoviesResponse } from "../types/api";
import { IMovieDetails, IMovieFilters, IMovieTrending } from "@/types/movies";
import { applyLocalFilters } from "../functions/applyLocalFilters";

export async function getTrending(): Promise<
  ISuccessfulMoviesResponse | { error: string }
> {
  return await api
    .get<ISuccessfulMoviesResponse>("movie/now_playing", {
      params: {
        language: "pt-BR",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("GET Trending Movies Error: ", err);
      return { error: err.message };
    });
}

export async function getMoviesWithFilters(
  filters: IMovieFilters
): Promise<ISuccessfulMoviesResponse | { error: string }> {
  const { release_date, query, genre, rating } = filters;

  const params = Object.entries({
    language: "pt-BR",
    "vote_average.gte": rating,
    with_genres: genre?.id,
    year: release_date,
  }).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string | number>);

  if (query) {
    params.query = query;
    try {
      const response = await api
        .get<ISuccessfulMoviesResponse>("search/movie", { params })
        .then((response) => response.data);

      const filteredResults = applyLocalFilters(response.results, filters);
      return { ...response, results: filteredResults };
    } catch (err: any) {
      console.error("GET Search Movies Error: ", err);
      return { error: err.message };
    }
  } else {
    return await api
      .get<ISuccessfulMoviesResponse>("discover/movie", { params })
      .then((response) => response.data)
      .catch((err) => {
        console.error("GET Discover Movies Error: ", err);
        return { error: err.message };
      });
  }
}

export async function getMovieDetails(
  movie_id: string
): Promise<IMovieDetails | { error: string }> {
  return await api
    .get<IMovieDetails>(`movie/${movie_id}`, {
      params: {
        language: "pt-BR",
        append_to_response: "videos",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("GET Trending Movies Error: ", err);
      return { error: err.message };
    });
}
