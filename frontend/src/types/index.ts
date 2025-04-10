export interface Movie {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  rating: number;
  imageUrl: string;
  genre: string[];
  director: string;
  cast: string[];
  plot?: string;
  posterUrl?: string;
  year?: number;
  runtime?: number;
}

export interface Review {
  id: string;
  movieId: string;
  userId: string;
  username: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
  likes: number;
}

// types.ts
export type User = {
  id: string;
  username: string;
  email: string;
  role?: "user" | "admin";
  avatar?: string;
};

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  data: T;
}
