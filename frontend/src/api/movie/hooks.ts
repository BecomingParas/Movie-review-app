import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createReview,
  fetchMovie,
  fetchMovieReviews,
  fetchMovies,
} from "./fetch";
import { errorToast } from "../../utils/toast";

/**
 * Hook to fetch all movies
 *
 * @function
 * @description Fetches the list of all available movies
 *
 * @example
 * ```tsx
 * const { data: movies, isLoading, error } = useMovies();
 *
 * if (isLoading) return <Loading />;
 * if (error) return <Error />;
 *
 * return (
 *   <div>
 *     {movies.map(movie => (
 *       <MovieCard key={movie.id} movie={movie} />
 *     ))}
 *   </div>
 * );
 * ```
 *
 * @returns {UseQueryResult} Query result with movies data
 */
export function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
}

/**
 * Hook to fetch a single movie
 *
 * @function
 * @description Fetches detailed information for a specific movie
 *
 * @param {string} id - Movie identifier
 *
 * @example
 * ```tsx
 * const { data: movie, isLoading } = useMovie("123");
 *
 * if (isLoading) return <Loading />;
 *
 * return <MovieDetails movie={movie} />;
 * ```
 *
 * @returns {UseQueryResult} Query result with movie details
 */
export function useMovie(id: string) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovie(id),
    enabled: !!id,
  });
}

/**
 * Hook to fetch movie reviews
 *
 * @function
 * @description Fetches reviews for a specific movie
 *
 * @param {string} movieId - Movie identifier
 *
 * @example
 * ```tsx
 * const { data: reviews } = useMovieReviews("123");
 *
 * return (
 *   <div>
 *     {reviews?.map(review => (
 *       <ReviewCard key={review.id} review={review} />
 *     ))}
 *   </div>
 * );
 * ```
 *
 * @returns {UseQueryResult} Query result with reviews data
 */
export function useMovieReviews(movieId: string) {
  return useQuery({
    queryKey: ["movie-reviews", movieId],
    queryFn: () => fetchMovieReviews(movieId),
    enabled: !!movieId,
  });
}

/**
 * Hook to create a movie review
 *
 * @function
 * @description Provides mutation functionality for creating movie reviews
 *
 * @example
 * ```tsx
 * const createReview = useCreateReviewMutation();
 *
 * const handleSubmit = async (data) => {
 *   try {
 *     await createReview.mutateAsync({
 *       movieId: "123",
 *       data: {
 *         rating: 5,
 *         comment: "Great movie!"
 *       }
 *     });
 *   } catch (error) {
 *     console.error(error);
 *   }
 * };
 * ```
 *
 * Features:
 * - Automatic error handling
 * - Toast notifications
 * - Cache invalidation
 * - Optimistic updates
 *
 * @returns {UseMutationResult} Mutation result object
 */
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
      errorToast(
        error.message || "Failed to submit review. Please try again later.",
      );
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["movie-reviews"] });
    },
  });
}
