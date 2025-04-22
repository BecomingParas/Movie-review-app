export type TMovies = {
  id: string;
  title: string;
  description: string;
  release_year: number;
  genre: string[];
  cast: string[];
  director: string;
  poster_url: string;
  video_url: string;
  average_rating?: number;
  total_reviews?: number;
  category: "featured" | "top_rated" | "recent";
  created_by_id?: string;
};
