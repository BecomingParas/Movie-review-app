import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMovies,
  getMovieById,
  searchMovies,
  getMovieReviews,
  createReview,
  updateReview,
  deleteReview,
  movieKeys,
  reviewKeys,
  type TCreateReviewInput,
} from "./fetch";

// Movie Hooks
export function useMovies() {
  return useQuery({
    queryKey: movieKeys.lists(),
    queryFn: getMovies,
  });
}

export function useMovie(id: string) {
  return useQuery({
    queryKey: movieKeys.detail(id),
    queryFn: () => getMovieById(id),
  });
}

export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: movieKeys.list(query),
    queryFn: () => searchMovies(query),
    enabled: query.length > 0,
  });
}

// Review Hooks
export function useMovieReviews(movieId: string) {
  return useQuery({
    queryKey: reviewKeys.list(movieId),
    queryFn: () => getMovieReviews(movieId),
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: (_, variables: TCreateReviewInput) => {
      // Invalidate and refetch movie reviews
      queryClient.invalidateQueries({
        queryKey: reviewKeys.list(variables.movieId),
      });
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      input,
    }: {
      reviewId: string;
      input: Partial<TCreateReviewInput>;
    }) => updateReview(reviewId, input),
    onSuccess: (_, variables) => {
      // Invalidate and refetch movie reviews
      if (variables.input.movieId) {
        queryClient.invalidateQueries({
          queryKey: reviewKeys.list(variables.input.movieId),
        });
      }
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onSuccess: (_, reviewId) => {
      // Invalidate and refetch movie reviews
      queryClient.invalidateQueries({
        queryKey: reviewKeys.list(reviewId),
      });
    },
  });
}
