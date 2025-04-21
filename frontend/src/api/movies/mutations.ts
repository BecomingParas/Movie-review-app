import { useMutation } from "@tanstack/react-query";
import { createMovie, TCreateMovieInput, TCreateMovieOutput } from "./fetch";

export function useCreateMovieMutation() {
  return useMutation<TCreateMovieOutput, Error, TCreateMovieInput>({
    mutationFn: createMovie,
  });
}
