import { getGenresFromArray } from "../../functions/genresFromArray";
import "./index.scss";

interface ICardProps {
  image_path: string;
  movie_name?: string;
  movie_genres?: Array<number>;
  rating?: number;
  onClick?: VoidFunction;
}

export const Card = ({
  image_path,
  movie_genres,
  movie_name,
  rating,
  onClick,
}: ICardProps) => {
  const formattedRating = rating && (rating * 10).toFixed();
  return (
    <div
      className="card_container"
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
          <svg className="progress_circle" viewBox="0 0 36 36">
            <path
              className="circle_background"
              d="M18 2.0845 
             a 15.9155 15.9155 0 0 1 0 31.831 
             a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle_progress"
              d="M18 2.0845 
             a 15.9155 15.9155 0 0 1 0 31.831 
             a 15.9155 15.9155 0 0 1 0 -31.831"
              style={{ strokeDasharray: `${formattedRating}, 100` }}
            />
          </svg>
          <span className="progress_text">{formattedRating}%</span>
        </div>
      )}
    </div>
  );
};
