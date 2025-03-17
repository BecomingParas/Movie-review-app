import { TMovie } from "./types";
import { api } from "../index";

export const getMovies = async (): Promise<TMovie[]> => {
  const response = await api.get("/api/movies");
  return response.data.data;
};

export const getMovieById = async (id: string): Promise<TMovie> => {
  const response = await api.get(`/api/movies/${id}`);
  return response.data.data;
};

export const getMovieReviews = async (id: string): Promise<any[]> => {
  const response = await api.get(`/api/movies/${id}/reviews`);
  return response.data.data;
};

export const createMovie = async (
  movieData: Omit<TMovie, "id">
): Promise<TMovie> => {
  const response = await api.post("/api/movies/create", movieData);
  return response.data.data;
};

export const updateMovie = async (
  id: string,
  movieData: Partial<TMovie>
): Promise<TMovie> => {
  const response = await api.put(`/api/movies/update/${id}`, movieData);
  return response.data.data;
};

export const deleteMovie = async (id: string): Promise<void> => {
  await api.delete(`/api/movies/delete/${id}`);
};
