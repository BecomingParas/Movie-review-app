import React from "react";
import { MovieCard } from "./MovieCard";
import { SectionHeader } from "../common/SectionHeader";
import { Movie } from "./types";

interface MovieGridProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
  showMore?: boolean;
  onShowMore?: () => void;
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
export const MovieGrid: React.FC<MovieGridProps> = ({
  title,
  movies,
  isLoading = false,
  showMore,
  onShowMore,
}) => {
  if (isLoading) {
    return (
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-4">
          <SectionHeader title={title} />
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-800 rounded-xl aspect-[2/3]" />
                  <div className="mt-4 space-y-3">
                    <div className="h-4 bg-gray-800 rounded w-3/4" />
                    <div className="h-3 bg-gray-800 rounded w-1/2" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    );
  }

  if (!movies?.length) {
    return (
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-4">
          <SectionHeader title={title} />
          <div className="text-center py-12">
            <p className="text-gray-400">No movies available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          title={title}
          showMore={showMore}
          onShowMore={onShowMore}
        />
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieGrid;
