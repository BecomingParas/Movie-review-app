export interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
  releaseDate: string;
  duration?: string;
  genre: string[];
  description?: string;
}

export interface MovieCardProps {
  movie: Movie;
  variant?: "default" | "featured" | "compact";
}

export interface MovieListProps {
  title: string;
  movies: Movie[];
  variant?: "default" | "featured" | "compact";
}

export interface MovieGridProps {
  title?: string;
  movies: Movie[];
  showMore?: boolean;
  onShowMore?: () => void;
}

export interface MovieDetailProps {
  id: string;
}

export interface Review {
  id: string;
  movieId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    name: string;
  };
}

export interface MovieResponse {
  isSuccess: boolean;
  data: Movie;
}

export interface MoviesResponse {
  isSuccess: boolean;
  data: Movie[];
}

export interface ReviewsResponse {
  isSuccess: boolean;
  data: Review[];
}

export interface SectionHeaderProps {
  title: string;
  showSeeMore?: boolean;
}
