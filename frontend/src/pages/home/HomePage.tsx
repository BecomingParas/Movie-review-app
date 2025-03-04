import React from "react";
import { HeroSection } from "../../components/home/HeroSection";
import { MovieGrid } from "../../components/home/MovieGrid";
import { UpcomingMovies } from "../../components/home/UpcomingMovies";
import { AboutSection } from "../../components/home/AboutSection";

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
export const HomePage = () => {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <MovieGrid />
      <UpcomingMovies />
      <AboutSection />
    </main>
  );
};

export default HomePage;
