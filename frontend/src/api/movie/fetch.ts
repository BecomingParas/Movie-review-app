import { BACKEND_URL } from "../../utils/config";
import { MovieResponse, MoviesResponse, ReviewsResponse } from "./types";

export async function fetchMovies(): Promise<MoviesResponse> {
  const response = await fetch(`${BACKEND_URL}/api/movies`);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json();
}

export async function fetchMovie(id: string): Promise<MovieResponse> {
  const response = await fetch(`${BACKEND_URL}/api/movies/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }
  return response.json();
}

export async function fetchMovieReviews(
  movieId: string
): Promise<ReviewsResponse> {
  const response = await fetch(`${BACKEND_URL}/api/movies/${movieId}/reviews`);
  if (!response.ok) {
    throw new Error("Failed to fetch movie reviews");
  }
  return response.json();
}

export async function createReview(
  movieId: string,
  data: { rating: number; comment: string }
): Promise<ReviewsResponse> {
  const response = await fetch(`${BACKEND_URL}/api/movies/${movieId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create review");
  }
  return response.json();
}
