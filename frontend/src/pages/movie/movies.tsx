import MovieList from "@/pages/movie/MovieList";

import { useGetAllMoviesQuery } from "@/api/movies/movie.mutations";

const Movies = () => {
  const { data, isLoading, isError } = useGetAllMoviesQuery();
  const movies = data?.data || [];
  const featuredMovies = movies.filter(
    (movie) => movie.category === "featured"
  );
  const trendingMovies = movies.filter(
    (movie) => movie.category === "trending-now"
  );
  const recentMovies = movies.filter((movie) => movie.category === "recent");
  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-gray-900 dark:text-white">
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 ">
            Movie Collection
          </h1>
          {isLoading ? (
            <p className="text-white">Loading....</p>
          ) : isError ? (
            <p className="text-red-500">Failed to load movies.</p>
          ) : (
            <>
              {featuredMovies.length > 0 && (
                <MovieList
                  title="Featured Movies"
                  movies={featuredMovies}
                  className="animate-fade-in mb-12"
                />
              )}

              {featuredMovies.length > 0 && (
                <MovieList
                  title="Trending Now Movies"
                  movies={trendingMovies}
                  className="animate-fade-in mb-12"
                />
              )}

              {featuredMovies.length > 0 && (
                <MovieList
                  title="Recent Movies"
                  movies={recentMovies}
                  className="animate-fade-in"
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Movies;
