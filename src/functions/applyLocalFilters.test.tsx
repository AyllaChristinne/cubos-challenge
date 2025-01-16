import { moviesTrendingMock } from "../__mocks__/movies";
import { applyLocalFilters } from "./applyLocalFilters";
import { IMovieTrending, IMovieFilters } from "@/types/movies";

describe("applyLocalFilters", () => {
  const movies = moviesTrendingMock;

  it("should filter movies by genre", () => {
    const filters: IMovieFilters = {
      genre: { id: 1, name: "" },
      rating: undefined,
    };

    const filteredMovies = applyLocalFilters(movies, filters);

    expect(filteredMovies).toHaveLength(2);
    expect(filteredMovies.map((movie) => movie.title)).toEqual([
      "Movie 1",
      "Movie 3",
    ]);
  });

  it("should filter movies by rating", () => {
    const filters: IMovieFilters = {
      genre: undefined,
      rating: 7.0,
    };

    const filteredMovies = applyLocalFilters(movies, filters);

    expect(filteredMovies).toHaveLength(3);
    expect(filteredMovies.map((movie) => movie.title)).toEqual([
      "Movie 1",
      "Movie 3",
      "Movie 4",
    ]);
  });

  it("should filter movies by multiple filters", () => {
    const filters: IMovieFilters = {
      genre: { id: 1, name: "" },
      rating: 7.0,
    };

    const filteredMovies = applyLocalFilters(movies, filters);

    expect(filteredMovies).toHaveLength(2);
    expect(filteredMovies.map((movie) => movie.title)).toEqual([
      "Movie 1",
      "Movie 3",
    ]);
  });

  it("should return all movies if no filters are applied", () => {
    const filters: IMovieFilters = {
      genre: undefined,
      rating: undefined,
    };

    const filteredMovies = applyLocalFilters(movies, filters);

    expect(filteredMovies).toHaveLength(4);
  });

  it("should return no movies if no movie matches the filters", () => {
    const filters: IMovieFilters = {
      genre: { id: 5, name: "" },
      rating: 10,
    };

    const filteredMovies = applyLocalFilters(movies, filters);

    expect(filteredMovies).toHaveLength(0);
  });
});
