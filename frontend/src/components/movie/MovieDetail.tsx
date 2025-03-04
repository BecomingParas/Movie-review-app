import { useParams } from "react-router-dom";
import { useMovie, useMovieReviews } from "../../api/movie/hooks";
import {
  FiStar,
  FiCalendar,
  FiPlay,
  FiShare2,
  FiBookmark,
  FiMessageSquare,
} from "react-icons/fi";
import { MovieCard } from "../../components/movie/MovieCard";
import { useState } from "react";

export function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading: isLoadingMovie } = useMovie(id!);
  const { data: reviews } = useMovieReviews(id!);
  const [activeTab, setActiveTab] = useState<"overview" | "reviews">(
    "overview"
  );

  if (isLoadingMovie) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold">Movie not found</h2>
          <p className="text-gray-400 mt-2">
            The movie you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <div className="absolute inset-0">
          <img
            src={movie.data.imageUrl}
            alt={movie.data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </div>

        <div className="absolute bottom-0 w-full p-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Movie Poster */}
              <div className="w-64 flex-shrink-0">
                <img
                  src={movie.data.imageUrl}
                  alt={movie.data.title}
                  className="w-full rounded-xl shadow-2xl"
                />
              </div>

              {/* Movie Info */}
              <div className="flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-blue-500 rounded-full text-sm font-medium">
                    HD
                  </span>
                  {movie.data.genre.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl font-bold mb-4">{movie.data.title}</h1>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <FiStar className="text-yellow-400" size={20} />
                    <span className="font-semibold">
                      {movie.data.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-gray-400" size={20} />
                    <span>{movie.data.releaseDate}</span>
                  </div>
                </div>

                <p className="text-gray-300 mb-8 max-w-2xl">
                  {movie.data.description}
                </p>

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors">
                    <FiPlay size={20} />
                    Watch Trailer
                  </button>
                  <button className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-colors">
                    <FiBookmark size={20} />
                    Watchlist
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                    <FiShare2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-800 mb-8">
          <button
            className={`pb-4 px-2 font-medium transition-colors relative ${
              activeTab === "overview"
                ? "text-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
            {activeTab === "overview" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
            )}
          </button>
          <button
            className={`pb-4 px-2 font-medium transition-colors relative ${
              activeTab === "reviews"
                ? "text-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({reviews?.data.length || 0})
            {activeTab === "reviews" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Storyline</h2>
              <p className="text-gray-300 mb-8">{movie.data.description}</p>

              {/* Cast Section */}
              <h2 className="text-2xl font-bold mb-4">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {/* Placeholder for cast members */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="text-center">
                    <div className="w-full aspect-square rounded-full bg-gray-800 mb-2" />
                    <h3 className="font-medium">Actor Name</h3>
                    <p className="text-sm text-gray-400">Character</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Similar Movies</h2>
              <div className="space-y-4">
                {/* Loading skeleton for similar movies */}
                {isLoadingMovie
                  ? Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="animate-pulse bg-gray-800/50 rounded-xl p-3 flex gap-4"
                        >
                          <div className="w-16 h-24 bg-gray-700 rounded-lg" />
                          <div className="flex-1">
                            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                            <div className="h-3 bg-gray-700 rounded w-1/2" />
                          </div>
                        </div>
                      ))
                  : // Placeholder similar movies - replace with actual similar movies data when available
                    Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <MovieCard
                          key={i}
                          movie={{
                            id: `similar-${i}`,
                            title: "Similar Movie",
                            imageUrl: "https://via.placeholder.com/300x450",
                            rating: 4.5,
                            releaseDate: "2024",
                            genre: ["Action", "Drama"],
                            description:
                              "A placeholder description for a similar movie.",
                          }}
                          variant="compact"
                        />
                      ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Add Review Button */}
            <button className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors">
              <FiMessageSquare size={20} />
              Write a Review
            </button>

            {/* Reviews List */}
            {reviews?.data.map((review) => (
              <div key={review.id} className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-700" />
                  <div>
                    <h3 className="font-medium">{review.user.username}</h3>
                    <div className="flex items-center gap-2">
                      <FiStar className="text-yellow-400" />
                      <span>{review.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
