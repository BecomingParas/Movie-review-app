import { Link } from "react-router-dom";
import { FiStar, FiClock, FiCalendar, FiHeart, FiPlay } from "react-icons/fi";
import { useState } from "react";

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    imageUrl: string;
    rating: number;
    releaseDate: string;
    duration?: string;
    genre: string[];
    description?: string;
  };
  variant?: "default" | "featured" | "compact";
}

export function MovieCard({ movie, variant = "default" }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!movie) {
    return null;
  }

  if (variant === "featured") {
    return (
      <Link
        to={`/movies/${movie.id}`}
        className="group relative h-[500px] overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="transform transition-transform duration-300 group-hover:translate-y-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center gap-1 bg-blue-500/80 px-3 py-1 rounded-full text-sm font-medium">
                <FiStar className="text-yellow-400" />
                {movie.rating.toFixed(1)}
              </span>
              {movie.duration && (
                <span className="flex items-center gap-1 text-sm text-gray-300">
                  <FiClock />
                  {movie.duration}
                </span>
              )}
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              {movie.title}
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
              <FiCalendar />
              {movie.releaseDate}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genre.map((genre) => (
                <span
                  key={genre}
                  className="bg-gray-700/60 px-3 py-1 rounded-full text-sm text-gray-200"
                >
                  {genre}
                </span>
              ))}
            </div>

            {movie.description && (
              <p className="text-gray-300 line-clamp-2 mb-4">
                {movie.description}
              </p>
            )}

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                <FiPlay size={18} />
                Watch Now
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/60 hover:bg-gray-700 transition-colors">
                <FiHeart size={18} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        to={`/movies/${movie.id}`}
        className="group flex items-center gap-4 bg-gray-800/50 rounded-xl p-3 hover:bg-gray-800 transition-colors"
      >
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-16 h-24 object-cover rounded-lg"
        />
        <div>
          <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1 text-yellow-400 text-sm">
              <FiStar size={14} />
              {movie.rating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-400">{movie.releaseDate}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/movies/${movie.id}`}
      className="group relative overflow-hidden rounded-xl bg-gray-800 transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
            <FiPlay size={18} />
            Watch Now
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-4">
        <div className="transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1 bg-blue-500/80 px-2 py-1 rounded-full text-sm">
              <FiStar className="text-yellow-400" />
              {movie.rating.toFixed(1)}
            </span>
            {movie.duration && (
              <span className="flex items-center gap-1 text-sm text-gray-300">
                <FiClock />
                {movie.duration}
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold text-white line-clamp-2 mb-1">
            {movie.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
            <FiCalendar />
            {movie.releaseDate}
          </div>

          <div className="flex flex-wrap gap-1">
            {movie.genre.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="text-xs bg-gray-700/60 px-2 py-1 rounded-full text-gray-300"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
