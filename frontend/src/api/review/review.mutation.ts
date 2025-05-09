import { useMutation } from "@tanstack/react-query";
import {
  createReview,
  deleteReview,
  TCreateReviewInput,
  TReviewResponse,
  TUpdateReviewInput,
  updateReview,
} from "./review.fetch";

export function useCreateReviewMutation() {
  return useMutation<TReviewResponse, Error, TCreateReviewInput>({
    mutationFn: createReview,
    onSuccess: (data) => {
      console.log("Review created: ", data.message);
    },
    onError: (error) => {
      console.log("Failed to create review: ", error.message);
    },
  });
}

export function useUpdateReviewMutation() {
  return useMutation<TReviewResponse, Error, TUpdateReviewInput>({
    mutationFn: updateReview,
    onSuccess: (data) => {
      console.log("Review updated:", data.message);
    },
    onError: (error) => {
      console.log("Failed to update review:", error.message);
    },
  });
}

export function useDeleteReviewMutation() {
  return useMutation<{ message: string; isSuccess: boolean }, Error, string>({
    mutationFn: deleteReview,
    onSuccess: (data) => {
      console.log("Review deleted:", data.message);
    },
    onError: (error) => {
      console.log("Failed to delete review:", error.message);
    },
  });
}
