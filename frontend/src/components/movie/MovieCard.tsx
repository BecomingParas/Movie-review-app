import { Link } from "react-router-dom";
import { Movie } from "../../utils/types";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-semibold mb-2">
        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
      </h3>
      <p className="text-gray-600">{movie.year}</p>
      <div className="mt-2">
        <span className="text-yellow-500">★</span>
        <span className="ml-1">{movie.rating}/10</span>
      </div>
    </div>
  );
}
