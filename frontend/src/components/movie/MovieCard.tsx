import React from "react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    imageUrl: string;
    rating?: number;
    releaseDate?: string;
    duration?: string;
    genre: string[];
    description?: string;
  };
  variant?: "default" | "featured" | "compact";
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  variant = "default",
}) => {
  if (!movie) {
    return null;
  }

  return (
    <Link to={`/movie/${movie.id}`} className="block group">
      <div className="relative overflow-hidden">
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105
            ${variant === "featured" ? "aspect-[0.73]" : "aspect-[0.73]"}`}
        />
      </div>

      <div className="mt-5">
        <h3
          className={`text-white font-normal leading-tight tracking-wide
          ${variant === "featured" ? "text-2xl" : "text-xl"}`}
        >
          {movie.title}
        </h3>

        <div className="flex items-center gap-3 mt-2 text-white">
          {movie.duration && (
            <span className="text-lg font-semibold">{movie.duration}</span>
          )}
          {movie.genre?.length > 0 && (
            <>
              <span className="text-xl font-bold">·</span>
              <span className="text-lg font-semibold text-red-500">
                {movie.genre.join(", ")}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
