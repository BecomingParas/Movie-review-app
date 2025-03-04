export interface Movie {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  releaseDate: string;
  genre: string[];
  cast: {
    id: string;
    name: string;
    role: string;
    imageUrl: string;
  }[];
}

export interface Review {
  id: string;
  movieId: string;
  user: {
    id: string;
    username: string;
    imageUrl?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface MovieResponse {
  data: Movie;
  message: string;
}

export interface MoviesResponse {
  data: Movie[];
  message: string;
}

export interface ReviewsResponse {
  data: Review[];
  message: string;
}
