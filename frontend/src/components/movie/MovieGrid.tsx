import React from "react";
import MovieCard from "./MovieCard";
import { MovieDetails, SectionHeaderProps } from "../movie/types";

interface MovieGridProps extends SectionHeaderProps {
  movies: MovieDetails[];
}

/**
 * MovieGrid Component
 *
 * @component
 * @description Displays a responsive grid of movie cards with a section header
 *
 * Features:
 * - Responsive grid layout
 * - Mobile-friendly design
 * - Flexible header with "See More" option
 * - Adaptive spacing
 *
 * @param {MovieGridProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const MovieGrid: React.FC<MovieGridProps> = ({
  title,
  movies,
  showSeeMore = true,
}) => {
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-32 py-8 sm:py-12 lg:py-16 bg-neutral-950">
      <header className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-10">
        <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            {title}
          </h2>
          <div className="h-0.5 bg-white w-[40px] sm:w-[60px] opacity-80" />
        </div>

        {showSeeMore && (
          <button
            className="text-xs tracking-widest text-white opacity-70 hover:opacity-100 transition-opacity
              sm:ml-auto py-2 px-4 sm:px-0 hover:bg-white/5 sm:hover:bg-transparent rounded-md sm:rounded-none
              active:scale-95 sm:active:scale-100 transform-gpu"
          >
            SEE MORE
          </button>
        )}
      </header>

      <div
        className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-24
          grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          auto-rows-max"
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id || index}
            className="w-full aspect-[0.75] sm:aspect-auto animate-fadeIn"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {/* Mobile "See More" button at bottom */}
      {showSeeMore && movies.length > 0 && (
        <button
          className="w-full mt-8 py-3 text-center text-sm text-white bg-white/5 
            rounded-md hover:bg-white/10 active:bg-white/15 transition-colors
            sm:hidden"
        >
          Load More Movies
        </button>
      )}

      {/* Empty state */}
      {movies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/70 text-sm sm:text-base">
            No movies available at the moment
          </p>
        </div>
      )}
    </section>
  );
};

export default MovieGrid;
