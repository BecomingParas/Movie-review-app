import { cn } from "@/lib/utils";
import MovieCard from "./MovieCard";
import { TMovie } from "@/types/movies.types";

interface MovieListProps {
  title?: string;
  movies: TMovie[];
  className?: string;
}

const MovieList: React.FC<MovieListProps> = ({ title, className, movies }) => {
  return (
    <section className={cn("py-10 px-4 ", className)}>
      <div className="container px-4 sm:px-6 mx-auto">
        {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie) =>
          movie._id ? (
            <MovieCard
              key={movie._id}
              id={movie._id}
              title={movie.title}
              posterUrl={movie.poster_url}
              rating={movie.average_rating}
              year={movie.release_year}
            />
          ) : null
        )}
      </div>
    </section>
  );
};

export default MovieList;
