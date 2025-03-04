import { env } from "../../utils/config";

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
  const res = await fetch(`${env.BACKEND_URL}/api/movies`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function getMovieById(id: string): Promise<TMovieResponse> {
  const res = await fetch(`${env.BACKEND_URL}/api/movies/${id}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function searchMovies(query: string): Promise<TMoviesResponse> {
  const res = await fetch(
    `${env.BACKEND_URL}/api/movies/search?q=${encodeURIComponent(query)}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

// Review API Functions
export async function getMovieReviews(
  movieId: string
): Promise<TReviewsResponse> {
  const res = await fetch(`${env.BACKEND_URL}/api/movies/${movieId}/reviews`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

export type TCreateReviewInput = {
  movieId: string;
  rating: number;
  comment: string;
};

export async function createReview(
  input: TCreateReviewInput
): Promise<TReviewResponse> {
  const res = await fetch(`${env.BACKEND_URL}/api/reviews`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function updateReview(
  reviewId: string,
  input: Partial<TCreateReviewInput>
): Promise<TReviewResponse> {
  const res = await fetch(`${env.BACKEND_URL}/api/reviews/${reviewId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function deleteReview(
  reviewId: string
): Promise<{ message: string; isSuccess: boolean }> {
  const res = await fetch(`${env.BACKEND_URL}/api/reviews/${reviewId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
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
