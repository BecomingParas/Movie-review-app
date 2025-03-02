import { Review } from "../../utils/types";

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-800">{review.content}</p>
          <div className="mt-2 text-sm text-gray-600">
            <span>Rating: {review.rating}/10</span>
            <span className="ml-4">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
