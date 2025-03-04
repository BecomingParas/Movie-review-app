import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MovieListProps } from "./types";
import { MovieCard } from "./MovieCard";

export function MovieList({ title, movies, variant }: MovieListProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <Link
          to="/movies"
          className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
        >
          View All <FiChevronRight />
        </Link>
      </div>
      <div
        className={`grid gap-6 ${
          variant === "compact"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
            : variant === "featured"
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} variant={variant} />
        ))}
      </div>
    </div>
  );
}
