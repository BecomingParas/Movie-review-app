export type TMovie = {
  _id: string;
  title: string;
  description: string;
  release_year: number;
  genre: string[];
  director: string;
  cast: string[];
  average_rating: number;
  poster_url: string;
  video_url?: string;
  category: string;
};

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

export type Role = "user" | "admin";

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role; // only "user" or "admin"
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  data: T;
}
