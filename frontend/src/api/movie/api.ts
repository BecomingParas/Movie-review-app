import { TMovie } from "./types";
import { env } from "../../utils/config";

export const getMovies = async (): Promise<TMovie[]> => {
  const response = await fetch(`${env.VITE_API_URL}/movies`);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json();
};

export const getMovieById = async (id: string): Promise<TMovie> => {
  const response = await fetch(`${env.VITE_API_URL}/movies/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }
  return response.json();
};

export const getMovieReviews = async (id: string): Promise<any[]> => {
  const response = await fetch(`${env.VITE_API_URL}/movies/${id}/reviews`);
  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return response.json();
};
