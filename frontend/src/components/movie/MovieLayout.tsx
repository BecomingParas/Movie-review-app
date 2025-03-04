"use client";
import React from "react";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import MovieGrid from "./MovieGrid";
import Footer from "../common/Footer";
import { MovieCard } from "./MovieCard";

const MovieLayout: React.FC = () => {
  const latestMovies = [
    {
      id: "1",
      title: "Avengers",
      description: "Earth's mightiest heroes must come together.",
      duration: "2hr 10min",
      genre: ["Action"],
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ea21bd38a47937949ec214c0ec425058d54e2ddc",
      rating: 4.5,
      releaseDate: "2024",
    },
    {
      id: "2",
      title: "Inception",
      description: "A thief who enters the dreams of others.",
      duration: "2hr 10min",
      genre: ["Action"],
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d42a1899cda83a277f9b661f5a71eaa51df54d6c",
      rating: 4.8,
      releaseDate: "2024",
    },
    {
      id: "3",
      title: "The Dark Knight",
      description: "The story of a wealthy stockbroker.",
      duration: "2hr 10min",
      genre: ["Action"],
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bea2e716106c5dd40d5af09ffec9963f6f92c573",
      rating: 4.7,
      releaseDate: "2024",
    },
    {
      id: "4",
      title: "The Lord of the Rings",
      description: "An epic fantasy adventure.",
      duration: "2hr 10min",
      genre: ["Action"],
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/60bb2a560c5a7bea632be455db5739cd34c0113d",
      rating: 4.9,
      releaseDate: "2024",
    },
  ];

  const secondRowMovies = [
    {
      id: "5",
      title: "The Wolf of Wall Street",
      description: "The story of a wealthy stockbroker.",
      duration: "2hr 10min",
      genre: ["Action"],
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/5a66caf148ce5c0334e9fbce60d4631c9db87ca4",
      rating: 4.3,
      releaseDate: "2024",
    },
    {
      id: "6",
      title: "Top Gun: Maverick",
      description: "The story of a wealthy stockbroker.",
      duration: "2hr 10min",
      genre: ["Action"],
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d5ddfb11102b7f59c34637c0159df8f7ac746c89",
      rating: 4.7,
      releaseDate: "2024",
    },
    {
      id: "7",
      title: "Interstellar",
      description: "The story of a wealthy stockbroker.",
      duration: "2hr 10min",
      genre: ["Action"],
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/7a78fc94821cd9d94215c02c1727481187ddcd4d",
      rating: 4.6,
      releaseDate: "2024",
    },
    {
      id: "8",
      title: "Pirates of the Caribbean",
      description: "The story of a wealthy stockbroker.",
      duration: "2hr 10min",
      genre: ["Action"],
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/357334ec585ee3e3bf3e9364a5d4e8e528038adb",
      rating: 4.4,
      releaseDate: "2024",
    },
  ];

  const upcomingMovies = [
    {
      id: "9",
      title: "The Lord of the Rings",
      description: "An epic fantasy adventure.",
      duration: "2hr 10min",
      genre: ["Action"],
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a32ea25e6c5074256ffc2aa92d2ed9da56ff6f4f",
      rating: 4.9,
      releaseDate: "2024",
    },
    {
      id: "10",
      title: "Kingdom of the Planet....",
      description: "The story of a wealthy stockbroker.",
      duration: "2hr 10min",
      genre: ["Action"],
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4da03f5e87de5ce4f9d8094231821239bdc86845",
      rating: 4.5,
      releaseDate: "2024",
    },
    {
      id: "11",
      title: "Civil War",
      description: "The story of a wealthy stockbroker.",
      duration: "2hr 10min",
      genre: ["Action"],
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1635875cfa3f3677786b6999660bc6d93640b59f",
      rating: 4.2,
      releaseDate: "2024",
    },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&family=Open+Sans:wght@400;600&family=Fira+Sans:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <main className="w-full min-h-screen bg-neutral-950">
        <Navigation />
        <HeroSection />
        <MovieGrid title="Latest Distributions" movies={latestMovies} />
        <MovieGrid title="Latest Distributions" movies={secondRowMovies} />
        <section className="px-32 py-16 bg-neutral-950">
          <header className="flex items-center mb-10">
            <h2 className="text-2xl font-semibold text-white">
              Upcoming Movies
            </h2>
            <div className="mx-5 my-0 h-0.5 bg-white w-[60px]" />
            <button className="ml-auto text-xs tracking-widest text-white opacity-[0.67]">
              SEE MORE
            </button>
          </header>
          <article className="relative mb-10">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/168707785d6d2488dbdc66f00572884070871a8a"
              alt="Kung Fu Panda 4"
              className="object-cover h-[562px] w-[865px] max-sm:h-[300px]"
            />
            <div className="mt-5">
              <h3 className="mb-2.5 text-2xl text-white">Kung Fu Panda 4</h3>
              <p className="text-white opacity-70">
                Po must train a new warrior when he's chosen to become the
                spiritual leader of the Valley of Peace. However, when a
                powerful shape-shifting sorceress sets her eyes on his Staff of
                Wisdom,
              </p>
              <div className="flex gap-2.5 items-center mt-2">
                <span className="text-lg font-semibold text-white opacity-[0.67]">
                  2hr 10min
                </span>
                <span className="text-xl font-bold text-white opacity-[0.67]">
                  .
                </span>
                <span className="text-lg font-semibold text-rose-600 opacity-[0.67]">
                  Action
                </span>
              </div>
            </div>
          </article>
          <div className="grid gap-8 grid-cols-[repeat(3,1fr)] max-sm:grid-cols-[1fr]">
            {upcomingMovies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default MovieLayout;
