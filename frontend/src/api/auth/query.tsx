import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  SignUpUser,
  TLoginUserInput,
  TLoginUserOutput,
  TSignUpUserInput,
  TSignUpUserOutput,
} from "./fetch";

/**
 * Hook for handling user registration
 *
 * @function
 * @description Provides mutation functionality for user registration
 *
 * @example
 * ```tsx
 * const signUpMutation = useSignUpUserMutation();
 *
 * const handleSignUp = async (data) => {
 *   try {
 *     await signUpMutation.mutateAsync(data);
 *     // Handle success
 *   } catch (error) {
 *     // Handle error
 *   }
 * };
 * ```
 *
 * @returns {UseMutationResult} Mutation result object
 */
export function useSignUpUserMutation() {
  return useMutation<TSignUpUserOutput, Error, TSignUpUserInput>({
    mutationFn: SignUpUser,
  });
}

/**
 * Hook for handling user login
 *
 * @function
 * @description Provides mutation functionality for user authentication
 *
 * @example
 * ```tsx
 * const loginMutation = useLoginUserMutation();
 *
 * const handleLogin = async (credentials) => {
 *   try {
 *     await loginMutation.mutateAsync(credentials);
 *     // Handle success
 *   } catch (error) {
 *     // Handle error
 *   }
 * };
 * ```
 *
 * @returns {UseMutationResult} Mutation result object
 */
export function useLoginUserMutation() {
  return useMutation<TLoginUserOutput, Error, TLoginUserInput>({
    mutationFn: loginUser,
  });
}
