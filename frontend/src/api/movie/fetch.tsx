import { api } from "../index";

// Types for Movie
export type TMovie = {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  rating: number;
  imageUrl: string;
  genre: string[];
  director: string;
  cast: string[];
};

// Types for Review
export type TReview = {
  id: string;
  movieId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    username: string;
    id: string;
  };
};

// API Response Types
export type TMovieResponse = {
  message: string;
  isSuccess: boolean;
  data: TMovie;
};

export type TMoviesResponse = {
  message: string;
  isSuccess: boolean;
  data: TMovie[];
};

export type TReviewResponse = {
  message: string;
  isSuccess: boolean;
  data: TReview;
};

export type TReviewsResponse = {
  message: string;
  isSuccess: boolean;
  data: TReview[];
};

// Movie API Functions
export async function getMovies(): Promise<TMoviesResponse> {
  const response = await api.get("/api/movies");
  return response.data;
}

export async function getMovieById(id: string): Promise<TMovieResponse> {
  const response = await api.get(`/api/movies/${id}`);
  return response.data;
}

export async function searchMovies(query: string): Promise<TMoviesResponse> {
  const response = await api.get(
    `/api/movies/search?q=${encodeURIComponent(query)}`
  );
  return response.data;
}

// Review API Functions
export async function getMovieReviews(
  movieId: string
): Promise<TReviewsResponse> {
  const response = await api.get(`/api/movies/${movieId}/reviews`);
  return response.data;
}

export type TCreateReviewInput = {
  movieId: string;
  rating: number;
  comment: string;
};

export async function createReview(
  input: TCreateReviewInput
): Promise<TReviewResponse> {
  const response = await api.post("/api/reviews", input);
  return response.data;
}

export async function updateReview(
  reviewId: string,
  input: Partial<TCreateReviewInput>
): Promise<TReviewResponse> {
  const response = await api.put(`/api/reviews/${reviewId}`, input);
  return response.data;
}

export async function deleteReview(
  reviewId: string
): Promise<{ message: string; isSuccess: boolean }> {
  const response = await api.delete(`/api/reviews/${reviewId}`);
  return response.data;
}

// React Query Keys
export const movieKeys = {
  all: ["movies"] as const,
  lists: () => [...movieKeys.all, "list"] as const,
  list: (filters: string) => [...movieKeys.lists(), { filters }] as const,
  details: () => [...movieKeys.all, "detail"] as const,
  detail: (id: string) => [...movieKeys.details(), id] as const,
};

export const reviewKeys = {
  all: ["reviews"] as const,
  lists: () => [...reviewKeys.all, "list"] as const,
  list: (movieId: string) => [...reviewKeys.lists(), { movieId }] as const,
  details: () => [...reviewKeys.all, "detail"] as const,
  detail: (id: string) => [...reviewKeys.details(), id] as const,
};
