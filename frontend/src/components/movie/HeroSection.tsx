"use client";
import React from "react";
import { FiPlay } from "react-icons/fi";
import { Movie } from "./types";

interface HeroSectionProps {
  movie?: Movie;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ movie }) => {
  return (
    <section className="relative h-[85vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie?.imageUrl || "https://via.placeholder.com/1920x1080"}
          alt={movie?.title || "Featured movie"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fade-in">
            {movie?.title || "Welcome to MovieReview"}
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in-delay">
            {movie?.description ||
              "Discover amazing movies and share your thoughts with our community."}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 animate-fade-in-delay-2">
            <button
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full transition-colors"
              onClick={() => {
                /* Handle trailer playback */
              }}
            >
              <FiPlay className="w-6 h-6" />
              Watch Trailer
            </button>
            {movie && (
              <div className="text-white">
                <p className="font-semibold">Featured Movie</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>{movie.releaseDate}</span>
                  <span>•</span>
                  <span>{movie.genre.join(", ")}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
