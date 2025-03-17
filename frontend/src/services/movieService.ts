import { Movie } from "@/types";
import { api } from "./api";

export const getMovies = async (): Promise<Movie[]> => {
  const response = await api.get<Movie[]>("/movies");
  return response.data;
};
