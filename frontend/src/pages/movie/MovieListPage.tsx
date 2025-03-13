import { useState } from "react";
import { useMovies, useSearchMovies } from "../../api/movie/hooks";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

function MovieListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: movies, isLoading: isLoadingMovies } = useMovies();
  const { data: searchResults, isLoading: isLoadingSearch } =
    useSearchMovies(searchQuery);

  const isLoading = isLoadingMovies || isLoadingSearch;
  const displayMovies = searchQuery ? searchResults?.data : movies?.data;

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={24}
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && !displayMovies && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              No movies found
            </h2>
            <p className="text-gray-400">
              Try adjusting your search or check back later.
            </p>
          </div>
        )}

        {/* Movie Grid */}
        {!isLoading && displayMovies && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayMovies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movies/${movie.id}`}
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative">
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                    ★ {movie.rating.toFixed(1)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    {movie.releaseDate}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {movie.genre.map((genre) => (
                      <span
                        key={genre}
                        className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieListPage;
