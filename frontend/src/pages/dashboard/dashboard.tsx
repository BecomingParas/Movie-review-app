import { useState } from "react";
import { useMovies } from "../../api/movie/hooks";
import { FiStar, FiClock, FiHeart, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";

function DashboardPage() {
  const { data: movies } = useMovies();
  const [activeTab, setActiveTab] = useState("recent");

  // Mock data for user stats (replace with actual data from your backend)
  const userStats = {
    totalReviews: 24,
    averageRating: 4.5,
    favoriteMovies: 12,
    watchlistCount: 8,
  };

  // Mock data for recent reviews (replace with actual data)
  const recentReviews = [
    {
      id: 1,
      movieTitle: "Inception",
      rating: 5,
      comment: "A masterpiece of modern cinema",
      date: "2024-03-04",
    },
    {
      id: 2,
      movieTitle: "The Dark Knight",
      rating: 4.5,
      comment: "Heath Ledger's performance is legendary",
      date: "2024-03-03",
    },
    // Add more mock reviews as needed
  ];

  // Get top rated movies from the API data
  const topRatedMovies =
    movies?.data.sort((a, b) => b.rating - a.rating).slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-gray-400">
            Here's what's happening with your movie reviews
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">Total Reviews</h3>
              <FiStar className="text-yellow-400" size={24} />
            </div>
            <p className="text-3xl font-bold">{userStats.totalReviews}</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">Avg. Rating</h3>
              <FiTrendingUp className="text-green-400" size={24} />
            </div>
            <p className="text-3xl font-bold">{userStats.averageRating}</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">Favorite Movies</h3>
              <FiHeart className="text-red-400" size={24} />
            </div>
            <p className="text-3xl font-bold">{userStats.favoriteMovies}</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">Watchlist</h3>
              <FiClock className="text-blue-400" size={24} />
            </div>
            <p className="text-3xl font-bold">{userStats.watchlistCount}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("recent")}
                className={`${
                  activeTab === "recent"
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Recent Reviews
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`${
                  activeTab === "favorites"
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Top Rated Movies
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Reviews */}
          {activeTab === "recent" && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-700 pb-4 last:border-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{review.movieTitle}</h3>
                      <div className="flex items-center text-yellow-400">
                        <FiStar className="mr-1" />
                        {review.rating}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      {review.comment}
                    </p>
                    <p className="text-gray-500 text-xs">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Rated Movies */}
          {activeTab === "favorites" && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Top Rated Movies</h2>
              <div className="space-y-4">
                {topRatedMovies.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movies/${movie.id}`}
                    className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-lg transition-colors"
                  >
                    <img
                      src={movie.imageUrl}
                      alt={movie.title}
                      className="w-16 h-24 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{movie.title}</h3>
                      <div className="flex items-center text-yellow-400 text-sm">
                        <FiStar className="mr-1" />
                        {movie.rating.toFixed(1)}
                      </div>
                      <p className="text-gray-400 text-sm">
                        {movie.releaseDate}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                to="/movies"
                className="block w-full bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Browse Movies
              </Link>
              <Link
                to="/reviews/new"
                className="block w-full bg-gray-700 text-white text-center py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Write a Review
              </Link>
              <Link
                to="/profile"
                className="block w-full bg-gray-700 text-white text-center py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
