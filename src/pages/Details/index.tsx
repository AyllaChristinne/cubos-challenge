import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { ImageCard } from "@/components/ImageCard";
import CircleProgress from "@/components/CircleProgress";
import { getMovieDetails } from "@/services/movies";
import { IMovieDetails, IMovieGenre } from "@/types/movies";
import { DetailCard } from "./components/DetailCard";
import { MovieVideo } from "./components/MovieVideo";
import {
  formatDate,
  formatMinutesToHours,
  formatRating,
} from "../../functions/formatInfo";
import { Loader } from "@/components/Loader";
import "./index.scss";
import { ErrorComponent } from "@/components/Error";

export const Details = () => {
  const { id } = useParams();
  const {
    data: movieDetails,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movieDetails"],
    enabled: !!id,
    queryFn: () => getMovieDetails(id!),
    retry: false,
    staleTime: 1000,
  });

  function genresCards(genres: Array<IMovieGenre>) {
    return genres.map((genre) => (
      <span key={genre.id} className="genre_card">
        {genre.name}
      </span>
    ));
  }

  function formatNumber(num: number) {
    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(2)}B`;
    } else if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(2)}M`;
    } else {
      return `$${(num / 1_000_000).toFixed(2)}M`;
    }
  }

  if (isLoading) return <Loader />;
  if (error) return <ErrorComponent error={error} />;

  return movieDetails ? (
    <div className="details_container">
      <div className="details_content">
        <div
          className="details_backdrop"
          role="presentation"
          style={{
            background: `linear-gradient(to left, var(--color-gradient-backdrop), var(--color-mauve-1) 100%), url("https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}")`,
          }}
        />
        <img
          className="details_moviePoster"
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt="Poster do filme"
        />
        <div className="details_movieHeader">
          <div>
            <h1 className="details_movieTitle">{movieDetails.title}</h1>
            <p className="details_movieOriginalTitle">
              Título Original: {movieDetails.original_title}
            </p>
            <p className="details_movieTagline">{movieDetails.tagline}</p>
          </div>
          <div className="details_movieHeaderCards">
            <DetailCard
              title="popularidade"
              content={movieDetails.popularity}
              isContentBold
            />
            <DetailCard
              title="votos"
              content={movieDetails.vote_count}
              isContentBold
            />
            <CircleProgress percent={formatRating(movieDetails.vote_average)} />
          </div>
        </div>
        <DetailCard
          title="sinopse"
          content={movieDetails.overview}
          className="details_synopsis"
          isTitleBig
        />
        <DetailCard
          title="gêneros"
          content={genresCards(movieDetails.genres)}
          className="details_genres"
          isTitleBig
        />
        <div className="details_movieGeneralCards">
          <DetailCard
            title="lançamento"
            content={formatDate(movieDetails.release_date)}
          />
          <DetailCard
            title="duração"
            content={formatMinutesToHours(movieDetails.runtime)}
          />
          <DetailCard title="situação" content={movieDetails.status} />
          <DetailCard title="idioma" content={movieDetails.original_language} />
        </div>
        <div className="details_movieMoneyCards">
          <DetailCard
            title="orçamento"
            content={formatNumber(movieDetails.budget)}
          />
          <DetailCard
            title="receita"
            content={formatNumber(movieDetails.revenue)}
          />
          <DetailCard
            title="lucro"
            content={formatNumber(movieDetails.revenue - movieDetails.budget)}
          />
        </div>
      </div>
      <MovieVideo videos={movieDetails.videos} />
    </div>
  ) : (
    <p>deu ruim</p>
  );
};
