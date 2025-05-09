import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  TCreateMovieInput,
  TCreateMovieOutput,
  TGetAllMoviesOutput,
  updateMovie,
} from "./movie.fetch";

// Mutation for create movie

export function useCreateMovieMutation() {
  const queryClient = useQueryClient();
  return useMutation<TCreateMovieOutput, Error, TCreateMovieInput>({
    mutationFn: createMovie,
    onSuccess: (data) => {
      console.log("Movie Created successfully", data.message);
    },
    onError: (error) => {
      console.log("Movie can't created", error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
}

// query for get all movies
export function useGetAllMoviesQuery() {
  return useQuery<TGetAllMoviesOutput, Error>({
    queryKey: ["movies"],
    queryFn: getAllMovies,
  });
}

// Mutation for update movie

export function useUpdateMovieMutation() {
  const queryClient = useQueryClient();
  return useMutation<
    TCreateMovieOutput,
    Error,
    { movieId: string; input: FormData }
  >({
    mutationFn: ({ movieId, input }) => updateMovie(movieId, input),
    onSuccess: (data) => {
      console.log("Movie updated successfully", data.message);
    },
    onError: (error) => {
      console.log("Movie update failed", error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
}

// Mutation for Delete movie

export function useDeleteMovieMutation() {
  const queryClient = useQueryClient();
  return useMutation<Omit<TCreateMovieOutput, "data">, Error, string>({
    mutationFn: deleteMovie,
    onSuccess: (data) => {
      console.log("Movie deleted successfully", data.message);
    },
    onError: (error) => {
      console.log("Movie delete failed", error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
}
