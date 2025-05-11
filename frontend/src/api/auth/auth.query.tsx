import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  SignUpUser,
  TLoginUserInput,
  TLoginUserOutput,
  TSignUpUserInput,
  TSignUpUserOutput,
} from "./auth.fetch";

// for signup api

export function useSignUpUserMutation() {
  return useMutation<TSignUpUserOutput, Error, TSignUpUserInput>({
    mutationFn: SignUpUser,
    onSuccess: (data) => {
      console.log("Signup success: ", data.message);
    },
    onError: (error) => {
      console.log("signup failed", error.message);
    },
  });
}

// for login api

export function useLoginUserMutation() {
  return useMutation<TLoginUserOutput, Error, TLoginUserInput>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login success: ", data.message);
    },
    onError: (error) => {
      console.error("Login failed: ", error.message);
    },
  });
}

import { useQuery } from "@tanstack/react-query";
import { getMe, TMeResponse } from "./auth.fetch";

export function useMeQuery() {
  return useQuery<TMeResponse, Error>({
    queryKey: ["me"],
    queryFn: getMe,
  });
}
