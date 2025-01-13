import api from "./api";
import { ISuccessfulGenreResponse } from "../types/api";

export async function getGenres(): Promise<
  ISuccessfulGenreResponse | { error: string }
> {
  return await api
    .get<ISuccessfulGenreResponse>("genre/movie/list", {
      params: { language: "pt-BR" },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("GET Genres Error: ", err);
      return { error: err.message };
    });
}
