import React from "react";
import { MovieDetail } from "../../components/movie/MovieDetail";
import Navbar from "../../components/common/Navbar";

export const MovieDetailPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <MovieDetail />
    </div>
  );
};

export default MovieDetailPage;
