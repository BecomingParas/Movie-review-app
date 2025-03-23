import { useAuth } from "@/hooks/useAuth";
import { useUserReviews } from "@/api/movie/hooks";
import { Movie } from "@/types";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: userReviews, isLoading: isLoadingReviews } = useUserReviews(
    user?.id || ""
  );

  if (isLoadingReviews) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}!</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Reviews</h2>
        {userReviews && userReviews.length > 0 ? (
          <div className="grid gap-4">
            {userReviews.map((review) => (
              <div key={review.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium">Movie ID: {review.movieId}</h3>
                <p className="text-gray-600">{review.comment}</p>
                <div className="mt-2">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{review.rating}/5</span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't written any reviews yet.</p>
        )}
      </div>
    </div>
  );
}
