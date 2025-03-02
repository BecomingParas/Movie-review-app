import { useQuery } from "@tanstack/react-query";
import { movieService } from "../../service/movieService";
import MovieCard from "../../components/movie/MovieCard";
import Spinner from "../components/Spinner";

export default function MovieListPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["movies"],
    queryFn: () => movieService.getMovies().then((res) => res.data),
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading movies</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
