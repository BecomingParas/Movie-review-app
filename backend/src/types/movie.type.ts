export type TMovies = {
  id: string;
  title: string;
  description: string;
  release_year: number;
  genre: string;
  created_by_id: string;
  category: "featured" | "top_rated" | "recent";
};
