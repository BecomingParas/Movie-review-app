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

export interface MovieCardProps {
  movie: TMovie;
  variant?: "default" | "compact" | "featured";
}
