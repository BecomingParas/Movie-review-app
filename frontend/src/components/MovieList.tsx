import React from "react";
import MovieCard from "./MovieCard";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getMovies, movieKeys } from "@/api/movie/fetch";
import { TMovie } from "@/api/movie/fetch";

interface MovieListProps {
  title?: string;
  className?: string;
}

const MovieList: React.FC<MovieListProps> = ({ title, className }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: movieKeys.lists(),
    queryFn: getMovies,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error loading movies. Please try again later.
      </div>
    );
  }

  const movies = data?.data || [];

  return (
    <section className={cn("py-10", className)}>
      <div className="container px-4 sm:px-6 mx-auto">
        {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie: TMovie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterUrl={movie.imageUrl}
              rating={movie.rating}
              year={new Date(movie.releaseDate).getFullYear()}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieList;
