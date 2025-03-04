import React from "react";
import { MovieCard } from "../movie/MovieCard";
import { SectionHeader } from "../common/SectionHeader";
import { useMovies } from "../../api/movie/hooks";

/**
 * MovieGrid Component
 *
 * @component
 * @description Displays a grid of movies in the latest distributions section.
 * Uses react-query for data fetching and handles loading states.
 *
 * @example
 * ```tsx
 * <MovieGrid />
 * ```
 *
 * Features:
 * - Responsive grid layout
 * - Integration with movie API
 * - Loading state handling
 * - Two different grid layouts for different movie displays
 *
 * Dependencies:
 * - useMovies hook for data fetching
 * - MovieCard component for individual movie display
 * - SectionHeader for consistent section styling
 */
export const MovieGrid = () => {
  const { data: movies, isLoading } = useMovies();

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <section className="py-8 sm:py-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Latest Distributions"
          showMore
          onShowMore={() => console.log("Show more clicked")}
        />

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          <MovieCard
            id="1"
            title="Avengers"
            image="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/95ded6d2f8f596bdc5c8a3c26622240a8cdfde026938857e2f91e9cd359ea27f?placeholderIfAbsent=true"
          />
          <MovieCard
            id="2"
            title="Inception"
            image="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/de103c5e44afe0299611f385daa7195b3f610457c8364cda9ed4535dcb34435e?placeholderIfAbsent=true"
          />
          <MovieCard
            id="3"
            title="The Dark Knight"
            image="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/948ddaa098bb6cdce6b42e3ad67b09a91ea9b255c65b8423b9d24503a7b54d97?placeholderIfAbsent=true"
          />
          <MovieCard
            id="4"
            title="The Lord of the Rings"
            image="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/19d1aa4440ed540ed47a57665bc1bfa1ace09349ee2affd9e073ea7213675261?placeholderIfAbsent=true"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-16">
          <MovieCard
            id="5"
            title="The Wolf of Wall Street"
            image="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/00383e879271b350eb361dff93a98b122db96c6980fe249ebc75b6da25963996?placeholderIfAbsent=true"
            variant="large"
          />
          <MovieCard
            id="6"
            title="Top Gun: Maverick"
            image="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/5f8c4771ae011105f035286523b9ad4eb6d93ce07fc98b2cfc0cf3a9a99e0b67?placeholderIfAbsent=true"
            variant="large"
          />
          <MovieCard
            id="7"
            title="Interstellar"
            image="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/5f4878f5ee18c2c1e8ee3bf275048d634d6271b058f2dc1e71ac1a95bae2bf06?placeholderIfAbsent=true"
            variant="large"
          />
        </div>
      </div>
    </section>
  );
};
