import React from "react";
import { useMovieReviews } from "../../api/movie/hooks";
import { ReviewForm } from "./ReviewForm";
import useAuthStore from "../../store/authStore";

interface ReviewListProps {
  movieId: string;
}

function ReviewList({ movieId }: ReviewListProps) {
  const { data: reviews, isLoading, refetch } = useMovieReviews(movieId);
  const { isAuthenticated } = useAuthStore();

  if (isLoading) {
    return <div className="text-white">Loading reviews...</div>;
  }

  return (
    <div className="space-y-6">
      {isAuthenticated && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            Write a Review
          </h3>
          <ReviewForm movieId={movieId} onSuccess={refetch} />
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">
          Reviews ({reviews?.length || 0})
        </h3>
        {reviews?.map((review) => (
          <div key={review.id} className="bg-gray-900 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">
                {review.user?.name || "Anonymous"}
              </span>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="text-white ml-1">{review.rating}</span>
              </div>
            </div>
            <p className="text-gray-300">{review.comment}</p>
          </div>
        ))}

        {(!reviews || reviews.length === 0) && (
          <p className="text-gray-400">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>
    </div>
  );
}

export default ReviewList;
