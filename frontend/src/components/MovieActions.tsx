import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function MovieActions({ movieId }: { movieId: string }) {
  const { canCreateMovies, canReviewMovies } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      {canCreateMovies && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate(`/movies/${movieId}/edit`)}
        >
          Edit Movie
        </button>
      )}

      {canReviewMovies && (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => navigate(`/movies/${movieId}/review`)}
        >
          Add Review
        </button>
      )}
    </div>
  );
}
