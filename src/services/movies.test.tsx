import { getTrending, getMoviesWithFilters, getMovieDetails } from "./movies";
import api from "../config/api";
import { ISuccessfulMoviesResponse } from "../types/api";
import { IMovieFilters } from "@/types/movies";
import {
  filteredMoviesTrendingMock,
  moviesTrendingMock,
} from "../__mocks__/movies";

jest.mock("../config/api");

describe("API calls", () => {
  describe("getTrending", () => {
    it("should return trending movies when the API call is successful", async () => {
      const trendingResponse: ISuccessfulMoviesResponse = {
        page: 1,
        results: moviesTrendingMock,
        total_pages: 10,
        total_results: 100,
      };

      (api.get as jest.Mock).mockResolvedValueOnce({ data: trendingResponse });

      const result = await getTrending(1);

      expect(result).toEqual(trendingResponse);
    });

    it("should handle errors correctly", async () => {
      const errorMessage = "Error fetching trending movies";
      (api.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      try {
        await getTrending(1);
      } catch (err: any) {
        expect(err.message).toBe(errorMessage);
      }
    });
  });

  describe("getMoviesWithFilters", () => {
    it("should return filtered movies when filters are applied", async () => {
      const filters: IMovieFilters = {
        genre: { id: 2, name: "Action" },
        rating: 7,
      };
      const filteredMoviesResponse: ISuccessfulMoviesResponse = {
        page: 1,
        results: filteredMoviesTrendingMock,
        total_pages: 1,
        total_results: 2,
      };

      (api.get as jest.Mock).mockResolvedValueOnce({
        data: filteredMoviesResponse,
      });

      const result = await getMoviesWithFilters(filters, 1);

      expect(result.results).toEqual(filteredMoviesResponse.results);
    });
  });

  describe("getMovieDetails", () => {
    it("should return movie details when the API call is successful", async () => {
      const movieDetails = {
        id: 1,
        title: "Movie 1",
        release_date: "2023-01-01",
        videos: { results: [{ key: "abc123", name: "Trailer" }] },
      };

      (api.get as jest.Mock).mockResolvedValueOnce({ data: movieDetails });

      const result = await getMovieDetails("1");

      expect(result).toEqual(movieDetails);
    });

    it("should handle errors correctly when fetching movie details", async () => {
      const errorMessage = "Error fetching movie details";
      (api.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      try {
        await getMovieDetails("1");
      } catch (err: any) {
        expect(err.message).toBe(errorMessage);
      }
    });
  });
});
