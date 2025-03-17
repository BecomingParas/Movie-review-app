import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieReviews, reviewKeys, TReview } from "@/api/movie/fetch";
import { Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ReviewListProps {
  movieId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ movieId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: reviewKeys.list(movieId),
    queryFn: () => getMovieReviews(movieId),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[100px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        Error loading reviews. Please try again later.
      </div>
    );
  }

  const reviews = data?.data || [];

  if (reviews.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">
        No reviews yet. Be the first to review this movie!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review: TReview) => (
          <div key={review.id} className="glass p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{review.user.username}</span>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{review.rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-muted-foreground">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
