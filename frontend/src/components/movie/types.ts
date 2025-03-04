export interface MovieDetails {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  releaseDate: string;
  duration?: string;
  genre: string[];
  cast?: {
    id: string;
    name: string;
    role: string;
    imageUrl: string;
  }[];
}

export interface MovieCardProps {
  movie: MovieDetails;
  variant?: "default" | "featured" | "compact";
}

export interface MovieListProps {
  title: string;
  movies: MovieDetails[];
  variant?: "default" | "featured" | "compact";
}

export interface SectionHeaderProps {
  title: string;
  showSeeMore?: boolean;
}
