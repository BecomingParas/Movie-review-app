export type TMovies = {
  id: string;
  title: string;
  description: string;
  release_year: number;
  duration: number;
  genre: [string, ...string[]];
  cast: [string, ...string[]];
  director: string;
  poster_url: string;
  video_url: string;
  average_rating?: number;
  total_reviews?: number;
  category: "featured" | "trending-now" | "recent";
  created_by_id?: string;
};
