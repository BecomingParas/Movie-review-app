import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  TLoginUserInput,
  TLoginUserOutput,
  TRegisterUserInput,
  TRegisterUserOutput,
} from "./fetch";

// for register api
export function useRegisterUserMutation() {
  return useMutation<TRegisterUserOutput, Error, TRegisterUserInput>({
    mutationFn: registerUser,
  });
}

// for login api
export function useLoginUserMutation() {
  return useMutation<TLoginUserOutput, Error, TLoginUserInput>({
    mutationFn: loginUser,
  });
}
