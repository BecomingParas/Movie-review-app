import axios, { AxiosResponse } from "axios";
import { Movie, Review } from "../utils/types";

const API_BASE = import.meta.env.VITE_API_BASE;

export const movieService = {
  getMovies: async (
    params?: Record<string, unknown>
  ): Promise<AxiosResponse<Movie[]>> => {
    return axios.get<Movie[]>(`${API_BASE}/movies`, { params });
  },

  getMovieById: async (id: string): Promise<AxiosResponse<Movie>> => {
    return axios.get<Movie>(`${API_BASE}/movies/${id}`);
  },

  createReview: async (
    movieId: string,
    reviewData: Omit<Review, "id" | "createdAt" | "userId">
  ): Promise<AxiosResponse<Review>> => {
    return axios.post<Review>(
      `${API_BASE}/movies/${movieId}/reviews`,
      reviewData
    );
  },
};
