import { TMovie } from "./types";
import { env } from "../../utils/config";

export const getMovies = async (): Promise<TMovie[]> => {
  const response = await fetch(`${env.BACKEND_URL}/movies`);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json();
};

// In your api.ts file, verify the backend URL
export const getMovieById = async (id: string): Promise<TMovie> => {
  // Add console log to verify the URL
  console.log(`Attempting to fetch from: ${env.BACKEND_URL}/movies/${id}`);

  try {
    const response = await fetch(`${env.BACKEND_URL}/movies/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch movie ${id}:`, error);
    throw new Error(
      `Failed to fetch movie. Please check if the server is running at ${env.BACKEND_URL}`
    );
  }
};

export const getMovieReviews = async (id: string): Promise<any[]> => {
  const response = await fetch(`${env.BACKEND_URL}/movies/${id}/reviews`);
  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return response.json();
};
