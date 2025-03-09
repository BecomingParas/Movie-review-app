"use client";
import React from "react";
import { Navigation } from "./Navigation";
import Footer from "../common/Footer";

interface MovieLayoutProps {
  children: React.ReactNode;
}

const MovieLayout: React.FC<MovieLayoutProps> = ({ children }) => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&family=Open+Sans:wght@400;600&family=Fira+Sans:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <main className="w-full min-h-screen bg-neutral-950">
        <Navigation />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default MovieLayout;
