/**
 * Movie Details Interface
 * @interface
 * @description Comprehensive movie information structure
 */
export interface MovieDetails {
  /** Unique identifier for the movie */
  id: string;
  /** Movie title */
  title: string;
  /** Full movie description */
  description: string;
  /** URL to movie poster or cover image */
  imageUrl: string;
  /** Average rating (0-5) */
  rating: number;
  /** Movie release date in ISO format */
  releaseDate: string;
  /** Movie duration in minutes or formatted string */
  duration?: string;
  /** Array of movie genres */
  genre: string[];
  /** Optional cast information */
  cast?: {
    id: string;
    name: string;
    role: string;
    imageUrl: string;
  }[];
}

/**
 * Movie Card Props Interface
 * @interface
 * @description Props for MovieCard component
 */
export interface MovieCardProps {
  /** Movie data to display */
  movie: MovieDetails;
  /** Visual variant of the card */
  variant?: "default" | "featured" | "compact";
}

/**
 * Movie List Props Interface
 * @interface
 * @description Props for MovieList component
 */
export interface MovieListProps {
  /** Section title */
  title: string;
  /** Array of movies to display */
  movies: MovieDetails[];
  /** Display variant for the list */
  variant?: "default" | "featured" | "compact";
}

/**
 * Section Header Props Interface
 * @interface
 * @description Props for section headers
 */
export interface SectionHeaderProps {
  /** Header title text */
  title: string;
  /** Whether to show "See More" option */
  showSeeMore?: boolean;
}

/**
 * Review Interface
 * @interface
 * @description Movie review data structure
 */
export interface Review {
  /** Unique review identifier */
  id: string;
  /** Associated movie ID */
  movieId: string;
  /** User who wrote the review */
  userId: string;
  /** Rating value (1-5) */
  rating: number;
  /** Review text content */
  comment: string;
  /** Review creation timestamp */
  createdAt: string;
  /** Optional user information */
  user?: {
    id: string;
    name: string;
  };
}

/**
 * Review Form Data Interface
 * @interface
 * @description Data structure for review submission
 */
export interface ReviewFormData {
  /** Rating value (1-5) */
  rating: number;
  /** Review comment text */
  comment: string;
}

/**
 * Reviews Response Interface
 * @interface
 * @description API response structure for reviews
 */
export interface ReviewsResponse {
  /** Array of review data */
  data: Review[];
  /** Response message */
  message: string;
  /** Operation success status */
  success: boolean;
}

export interface MovieResponse {
  data: MovieDetails;
  message: string;
  success: boolean;
}

export interface MoviesResponse {
  data: MovieDetails[];
  message: string;
  success: boolean;
}
