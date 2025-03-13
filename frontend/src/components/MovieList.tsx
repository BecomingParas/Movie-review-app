import React from "react";
import MovieCard from "./MovieCard";
import { cn } from "@/lib/utils";

interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  rating: number;
  year: number;
}

interface MovieListProps {
  title?: string;
  movies: Movie[];
  className?: string;
}

const MovieList: React.FC<MovieListProps> = ({ title, movies, className }) => {
  return (
    <section className={cn("py-10", className)}>
      <div className="container px-4 sm:px-6 mx-auto">
        {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterUrl={movie.posterUrl}
              rating={movie.rating}
              year={movie.year}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieList;
