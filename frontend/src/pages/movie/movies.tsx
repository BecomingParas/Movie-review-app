import MovieList from "@/pages/movie/MovieList";
import { featuredMovies, topRatedMovies, recentMovies } from "@/data/mockData";

const Movies = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Movie Collection
          </h1>

          <MovieList
            title="Featured Movies"
            movies={featuredMovies}
            className="animate-fade-in mb-12"
          />

          <MovieList
            title="Top Rated Movies"
            movies={topRatedMovies}
            className="animate-fade-in mb-12"
          />

          <MovieList
            title="Recent Movies"
            movies={recentMovies}
            className="animate-fade-in"
          />
        </div>
      </main>
    </div>
  );
};

export default Movies;
