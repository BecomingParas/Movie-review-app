import MovieForm from "@/components/movie-form/movie-create";
import { useMovies } from "@/hooks/useMovies";

export const MoviePage = () => {
  const { data: movies, isLoading } = useMovies();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Movie</h1>
      <MovieForm onSuccess={() => alert("Movie created successfully!")} />

      <h2 className="text-xl font-semibold mt-8 mb-4">All Movies</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {movies?.map((movie: any) => (
            <li key={movie._id} className="border p-2 my-2">
              {movie.title} ({movie.release_year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
