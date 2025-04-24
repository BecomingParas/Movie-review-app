import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createMovie,
  getAllMovies,
  TCreateMovieInput,
  TCreateMovieOutput,
  TGetAllMoviesOutput,
} from "./fetch";

export function useCreateMovieMutation() {
  return useMutation<TCreateMovieOutput, Error, TCreateMovieInput>({
    mutationFn: createMovie,
    onSuccess: (data) => {
      console.log("Movie Created successfully", data.message);
    },
    onError: (error) => {
      console.log("Movie can't created", error.message);
    },
  });
}

export function useGetAllMoviesQuery(page = 1, limit = 10) {
  return useQuery<TGetAllMoviesOutput, Error>({
    queryKey: ["movies", page, limit],
    queryFn: () => getAllMovies({ page, limit }),
  });
}
