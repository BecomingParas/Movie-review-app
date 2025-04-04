import { useParams } from "react-router-dom";
import { useMovie } from "@/api/movie/hooks";
import { Movie } from "@/types";

export default function MovieReview() {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading } = useMovie(id!) as {
    data: Movie | undefined;
    isLoading: boolean;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Review Movie: {movie?.title}</h1>
      {/* Add your review form here */}
    </div>
  );
}
