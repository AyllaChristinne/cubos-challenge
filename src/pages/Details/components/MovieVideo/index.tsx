import { IMovieVideos } from "@/types/movies";
import "./index.scss";

interface IMovieVideoProps {
  videos: IMovieVideos;
}

export function MovieVideo({ videos }: IMovieVideoProps) {
  const youtubeVideo = videos.results.find(
    (result) => result.site === "YouTube"
  );

  if (!youtubeVideo) {
    return (
      <p style={{ color: "var(--color-text-primary)" }}>
        Nenhum vídeo do YouTube encontrado.
      </p>
    );
  }

  const videoUrl = `https://www.youtube.com/embed/${youtubeVideo.key}`;

  return (
    <div className="movieVideo_container">
      <h2 className="movieVideo_title">Trailer</h2>
      <iframe
        src={videoUrl}
        title={youtubeVideo.name}
        frameBorder="0"
        allow="picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
