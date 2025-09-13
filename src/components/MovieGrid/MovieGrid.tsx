import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const PLACEHOLDER = "/placeholder.png";

 return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        const { id, poster_path, title } = movie;
        const imageUrl = poster_path
          ? `${IMAGE_BASE_URL}${poster_path}`
          : PLACEHOLDER;

        return (
          <li key={id}>
            <div className={css.card} onClick={() => onSelect(movie)}>
              <img
                className={css.image}
                src={imageUrl}
                alt={title}
                loading="lazy"
              />
              <h2 className={css.title}>{title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

