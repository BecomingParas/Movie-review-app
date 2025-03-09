import React from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { HeroSection } from "../../components/movie/HeroSection";
import MovieGrid from "../../components/movie/MovieGrid";
import { useMovies } from "../../api/movie/hooks";

/**
 * HomePage Component
 *
 * @component
 * @description The main landing page of the movie review application.
 * Combines multiple sections to create a complete home page experience.
 *
 * @example
 * ```tsx
 * <HomePage />
 * ```
 *
 * Component Structure:
 * 1. HeroSection - Main banner with featured movie
 * 2. MovieGrid - Latest movie distributions
 * 3. UpcomingMovies - Upcoming releases
 * 4. AboutSection - Company information
 *
 * Features:
 * - Fully responsive design
 * - Data integration with movie API
 * - Consistent styling
 * - Optimized performance
 *
 * Dependencies:
 * - React Router for navigation
 * - React Query for data fetching
 * - Tailwind CSS for styling
 */
export const HomePage: React.FC = () => {
  const { data: movies, isLoading } = useMovies();

  const featuredMovies = movies?.data?.slice(0, 4) || [];
  const latestMovies = movies?.data?.slice(4, 8) || [];
  const upcomingMovies = movies?.data?.slice(8, 12) || [];

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <HeroSection />

        {/* Featured Movies */}
        <section className="py-16">
          <MovieGrid
            title="Featured Movies"
            movies={featuredMovies}
            showMore
            onShowMore={() => console.log("Show more featured movies")}
          />
        </section>

        {/* Latest Releases */}
        <section className="py-16 bg-background-alt">
          <MovieGrid
            title="Latest Releases"
            movies={latestMovies}
            showMore
            onShowMore={() => console.log("Show more latest movies")}
          />
        </section>

        {/* Upcoming Movies */}
        <section className="py-16">
          <MovieGrid
            title="Coming Soon"
            movies={upcomingMovies}
            showMore
            onShowMore={() => console.log("Show more upcoming movies")}
          />
        </section>
      </div>
    </MainLayout>
  );
};

export default HomePage;
