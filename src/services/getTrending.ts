import api from "./api";
import { ISuccessfulResponse } from "../types/api";

export async function getTrending(): Promise<
  ISuccessfulResponse | { error: string }
> {
  return await api
    .get<ISuccessfulResponse>("/now_playing", { params: { language: "en-US" } })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("GET Trending Movies Error: ", err);
      return { error: err.message };
    });
}
