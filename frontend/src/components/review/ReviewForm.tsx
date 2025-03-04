import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateReviewMutation } from "../../api/movie/hooks";
import { successToast, errorToast } from "../../utils/toast";

const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  comment: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(500, "Review cannot exceed 500 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  movieId: string;
  onSuccess?: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  movieId,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  const createReviewMutation = useCreateReviewMutation();

  const onSubmit = async (data: ReviewFormData) => {
    try {
      await createReviewMutation.mutateAsync({
        movieId,
        data: {
          rating: data.rating,
          comment: data.comment,
        },
      });
      successToast("Review submitted successfully!");
      reset();
      onSuccess?.();
    } catch (error) {
      errorToast("Failed to submit review");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-gray-900 p-6 rounded-lg"
    >
      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-white mb-1"
        >
          Rating
        </label>
        <select
          id="rating"
          {...register("rating", { valueAsNumber: true })}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-red-500"
        >
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {value} Star{value !== 1 ? "s" : ""}
            </option>
          ))}
        </select>
        {errors.rating && (
          <p className="mt-1 text-sm text-red-500">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-white mb-1"
        >
          Your Review
        </label>
        <textarea
          id="comment"
          {...register("comment")}
          rows={4}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-red-500 resize-none"
          placeholder="Share your thoughts about the movie..."
        />
        {errors.comment && (
          <p className="mt-1 text-sm text-red-500">{errors.comment.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors
          ${
            isSubmitting
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};
