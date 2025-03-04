import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createReview,
  fetchMovie,
  fetchMovieReviews,
  fetchMovies,
} from "./fetch";
import { errorToast } from "../../utils/toast";

export function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
}

export function useMovie(id: string) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovie(id),
    enabled: !!id,
  });
}

export function useMovieReviews(movieId: string) {
  return useQuery({
    queryKey: ["movie-reviews", movieId],
    queryFn: () => fetchMovieReviews(movieId),
    enabled: !!movieId,
  });
}

export function useCreateReviewMutation() {
  return useMutation({
    mutationFn: ({
      movieId,
      data,
    }: {
      movieId: string;
      data: { rating: number; comment: string };
    }) => createReview(movieId, data),
    onError: (error: Error) => {
      errorToast(error.message);
    },
  });
}
