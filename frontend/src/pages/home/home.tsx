import { useState } from "react";
import { FiSearch, FiPlay, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { useMovies } from "../../api/movie/hooks";
import { MovieCard } from "../../components/movie/MovieCard";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: movies, isLoading, error } = useMovies();

  // Get featured movies (top rated)
  const featuredMovies =
    movies?.data?.sort((a, b) => b.rating - a.rating).slice(0, 4) || [];

  // Get latest movies
  const latestMovies =
    movies?.data
      ?.sort(
        (a, b) =>
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      )
      .slice(0, 6) || [];

  const categories = [
    { name: "Action", icon: "🎬", count: "1.2K", color: "bg-red-500" },
    { name: "Drama", icon: "🎭", count: "856", color: "bg-blue-500" },
    { name: "Sci-Fi", icon: "🚀", count: "654", color: "bg-purple-500" },
    { name: "Comedy", icon: "😄", count: "945", color: "bg-yellow-500" },
    { name: "Horror", icon: "👻", count: "432", color: "bg-gray-500" },
    { name: "Romance", icon: "❤️", count: "678", color: "bg-pink-500" },
    { name: "Documentary", icon: "📚", count: "234", color: "bg-green-500" },
    { name: "Animation", icon: "🎨", count: "567", color: "bg-indigo-500" },
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-gray-400 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative h-[80vh] flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            {featuredMovies[0] ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${featuredMovies[0].imageUrl})`,
                }}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          </div>

          <div className="relative container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                Discover Amazing Movies
              </h1>
              <p className="text-xl text-gray-300 mb-8 animate-fade-in-delay">
                Your ultimate destination for movie reviews and ratings. Join
                our community of movie enthusiasts.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl animate-fade-in-delay-2">
                <input
                  type="text"
                  placeholder="Search for movies, actors, or genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors">
                  <FiSearch size={20} />
                </button>
              </div>

              {/* Featured Movie Info */}
              {featuredMovies[0] && (
                <div className="mt-12 flex items-center gap-4 animate-fade-in-delay-3">
                  <button className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors">
                    <FiPlay />
                    Watch Trailer
                  </button>
                  <div className="text-white">
                    <p className="font-semibold">Featured Movie</p>
                    <p className="text-gray-400">{featuredMovies[0].title}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Featured Movies Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Movies</h2>
            <Link
              to="/movies"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
            >
              View All <FiChevronRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-gray-800 rounded-xl"
                    >
                      <div className="aspect-[2/3] bg-gray-700 rounded-t-xl" />
                      <div className="p-4">
                        <div className="h-4 bg-gray-700 rounded w-1/2 mb-2" />
                        <div className="h-3 bg-gray-700 rounded w-3/4" />
                      </div>
                    </div>
                  ))
              : featuredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
          </div>
        </div>

        {/* Latest Releases */}
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Latest Releases</h2>
            <Link
              to="/movies/latest"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
            >
              View All <FiChevronRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-gray-800 rounded-xl"
                    >
                      <div className="aspect-[2/3] bg-gray-700 rounded-t-xl" />
                      <div className="p-3">
                        <div className="h-3 bg-gray-700 rounded w-2/3 mb-2" />
                        <div className="h-2 bg-gray-700 rounded w-1/2" />
                      </div>
                    </div>
                  ))
              : latestMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} variant="compact" />
                ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Browse by Category</h2>
            <Link
              to="/categories"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
            >
              All Categories <FiChevronRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase()}`}
                className="group bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`text-4xl mb-3 ${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto`}
                >
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-400">{category.count} movies</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
