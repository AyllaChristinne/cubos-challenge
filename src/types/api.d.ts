import { IMovieTrending } from "./movies";

export interface ISuccessfulResponse {
  page: number;
  results: Array<IMovieTrending>;

  total_pages: number;
  total_results: number;
}
