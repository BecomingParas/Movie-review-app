// import { cn } from "@/lib/utils";
// import MovieCard from "./MovieCard";

import { useMovies } from "@/hooks/useMovies";

// interface Movie {
//   id: number;
//   title: string;
//   posterUrl: string;
//   rating: number;
//   year: number;
// }

// interface MovieListProps {
//   title?: string;
//   movies: Movie[];
//   className?: string;
// }
// const MovieList: React.FC<MovieListProps> = ({ title, className, movies }) => {
//   return (
//     <section className={cn("py-10 px-4", className)}>
//       <div className="container px-4 sm:px-6 mx-auto">
//         {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
//       </div>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
//         {movies.map((movie) => (
//           <MovieCard
//             key={movie.id}
//             id={movie.id}
//             title={movie.title}
//             posterUrl={movie.posterUrl}
//             rating={movie.rating}
//             year={movie.year}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default MovieList;

const MovieList = () => {
  const { data, isLoading, error } = useMovies();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching movies</p>;

  return (
    <div className="space-y-4">
      {data?.map((movie: any) => (
        <div key={movie._id} className="p-4 border rounded">
          <h2 className="font-bold text-lg">{movie.title}</h2>
          <p>{movie.description}</p>
          <p>Genre: {movie.genre}</p>
          <p>Year: {movie.release_year}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
