"use client";
import React from "react";
import MovieLayout from "./MovieLayout";
import { HeroSection } from "./HeroSection";
import MovieGrid from "./MovieGrid";
import { useMovies } from "../../api/movie/hooks";

export const MoviePage: React.FC = () => {
  const { data: movies, isLoading } = useMovies();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <MovieLayout>
      <HeroSection />
      {movies?.data && (
        <>
          <MovieGrid
            title="Latest Movies"
            movies={movies.data.slice(0, 4)}
            showMore
          />
          <MovieGrid title="Featured Movies" movies={movies.data.slice(4, 7)} />
        </>
      )}
    </MovieLayout>
  );
};

export default MoviePage;
