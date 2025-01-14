import { IMovieGenre } from "@/types/movies";

export function getGenresFromArray(ids: Array<number>) {
  const genres = JSON.parse(localStorage.getItem("@cubos-movies/genres") || "");

  return (
    genres &&
    ids
      .map((id) => {
        const genre = genres.find((genre: IMovieGenre) => genre.id === id);
        return genre ? genre.name : null;
      })
      .filter((name) => name !== null)
      .join(", ")
  );
}
