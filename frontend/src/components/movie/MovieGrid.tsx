import React from "react";
import MovieCard from "./MovieCard";
import { MovieDetails, SectionHeaderProps } from "../movie/types";

interface MovieGridProps extends SectionHeaderProps {
  movies: MovieDetails[];
}

const MovieGrid: React.FC<MovieGridProps> = ({
  title,
  movies,
  showSeeMore = true,
}) => {
  return (
    <section className="px-32 py-16 bg-neutral-950 max-md:px-5">
      <header className="flex items-center mb-10 max-md:flex-wrap max-md:gap-4">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <div className="mx-5 my-0 h-0.5 bg-white w-[60px] max-md:order-3 max-md:w-full" />
        {showSeeMore && (
          <button className="ml-auto text-xs tracking-widest text-white opacity-[0.67] hover:opacity-100 max-md:ml-0">
            SEE MORE
          </button>
        )}
      </header>
      <div className="grid gap-24 grid-cols-[repeat(4,1fr)] max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:gap-8 max-sm:grid-cols-1">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieGrid;
