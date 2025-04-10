"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/ui/star-rating";

interface ReviewFormProps {
  movieId: string;
  initialData?: {
    rating: number;
    content: string;
  };
  onSuccess?: () => void;
  isEdit?: boolean;
}

interface FormValues {
  content: string;
}

export function ReviewForm({
  movieId,
  initialData,
  onSuccess,
  isEdit = false,
}: ReviewFormProps) {
  // In a real app, this would come from your auth context/provider
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      content: initialData?.content || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (rating === 0) {
      // Show error for rating
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, this would call your API
      console.log({
        movieId,
        rating,
        content: data.content,
        isEdit,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onSuccess) {
        onSuccess();
      }

      // Reset form if not editing
      if (!isEdit) {
        setRating(0);
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-muted p-6 rounded-lg text-center">
        <p className="mb-4">You need to be logged in to leave a review.</p>
        <Button asChild>
          <a href="/auth/login">Login</a>
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-card p-6 rounded-lg border"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium">Your Rating</label>
        <StarRating value={rating} onChange={setRating} />
        {rating === 0 && (
          <p className="text-sm text-destructive">Please select a rating</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Your Review
        </label>
        <Textarea
          id="content"
          placeholder="Share your thoughts about this movie..."
          className="min-h-[120px]"
          {...register("content", {
            required: "Review content is required",
            minLength: {
              value: 10,
              message: "Review must be at least 10 characters",
            },
          })}
        />
        {errors.content && (
          <p className="text-sm text-destructive">{errors.content.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? "Submitting..."
          : isEdit
          ? "Update Review"
          : "Submit Review"}
      </Button>
    </form>
  );
}
