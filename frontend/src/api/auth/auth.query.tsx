import { useMutation, useQuery } from "@tanstack/react-query";
import {
  loginUser,
  SignUpUser,
  TLoginUserInput,
  TLoginUserOutput,
  TSignUpUserInput,
  TSignUpUserOutput,
  getMe,
  TMeResponse,
} from "./auth.fetch";

// Signup mutation hook
export function useSignUpUserMutation() {
  return useMutation<TSignUpUserOutput, Error, TSignUpUserInput>({
    mutationFn: SignUpUser,
    onSuccess: (data) => {
      console.log("Signup success:", data.message);
      // You can add any post-signup logic here (e.g., redirect)
    },
    onError: (error) => {
      console.error("Signup failed:", error.message);
    },
  });
}

// Login mutation hook
export function useLoginUserMutation() {
  return useMutation<TLoginUserOutput, Error, TLoginUserInput>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login success:", data.message);
      // Post-login logic here (e.g., update global state, redirect)
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });
}

// Query hook to get current logged-in user info
export function useMeQuery() {
  return useQuery<TMeResponse, Error>({
    queryKey: ["me"],
    queryFn: getMe,
    // You can add options like staleTime, cacheTime, retry, etc. here
  });
}
