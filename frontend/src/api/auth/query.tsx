import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  SignUpUser,
  TLoginUserInput,
  TLoginUserOutput,
  TSignUpUserInput,
  TSignUpUserOutput,
} from "./fetch";

// for signup api

export function useSignUpUserMutation() {
  return useMutation<TSignUpUserOutput, Error, TSignUpUserInput>({
    mutationFn: SignUpUser,
  });
}

// for login api

export function useLoginUserMutation() {
  return useMutation<TLoginUserOutput, Error, TLoginUserInput>({
    mutationFn: loginUser,
  });
}
