export interface TMovie {
  id: string;
  title: string;
  description: string;
  release_year: string;
  rating: number;
  genre: string[];
  average_rating: number;
  director: string;
  cast: string[];
  poster_url?: string;
  video_url?: string;
  category: string;
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
