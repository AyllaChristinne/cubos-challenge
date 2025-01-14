import { getGenresFromArray } from "../../functions/genresFromArray";
import CircleProgress from "../CircleProgress";
import "./index.scss";

interface ICardProps {
  image_path: string;
  movie_name?: string;
  movie_genres?: Array<number>;
  rating?: number;
  onClick?: VoidFunction;
}

export const ImageCard = ({
  image_path,
  movie_genres,
  movie_name,
  rating,
  onClick,
}: ICardProps) => {
  const formattedRating = rating && (rating * 10).toFixed();
  return (
    <div
      className={`card_container${onClick ? "__withAction" : ""}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onClick) onClick();
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${image_path}`}
        className="card_image"
        alt={`Poster de ${movie_name}`}
      />
      {movie_name && movie_genres && (
        <div className="card_movieInfo">
          <p className="card_movieName">{movie_name}</p>
          <p className="card_movieGenres">{getGenresFromArray(movie_genres)}</p>
        </div>
      )}

      {rating && (
        <div className="card_popularity">
          <CircleProgress percent={formattedRating} />
        </div>
      )}
    </div>
  );
};
