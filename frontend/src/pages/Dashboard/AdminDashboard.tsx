import { useGetAllMoviesQuery } from "@/api/movies/movie.mutations";
import { useAuthStore } from "@/store/auth.store";
import { AdminDashboardData } from "@/types/dashboard.types";
import { TMovie } from "@/types/movies.types";
import {
  BarChart3,
  Film,
  Pencil,
  PlusCircle,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import { ComponentType, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
interface StatItem {
  title: string;
  value: string | number;
  icon: ComponentType<{ className?: string }>;
  color: "purple" | "pink" | "blue" | "green";
}
const AdminDashboard = ({ data }: { data: AdminDashboardData }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isCheckingAuth, logout } = useAuthStore();
  const [authLoading, setAuthLoading] = useState(true);
  const {
    data: moviesQueryResult,
    isLoading: moviesLoading,
    isError: moviesError,
  } = useGetAllMoviesQuery();
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<TMovie | null>(null);

  useEffect(() => {
    if (!isCheckingAuth) {
      if (!isAuthenticated || user?.role !== "admin") {
        navigate("/login");
      }
      setAuthLoading(false);
    }
  }, [isAuthenticated, isCheckingAuth, navigate, user]);

  const handleEditMovie = (movie: TMovie) => {
    setSelectedMovie(movie);
    setShowMovieModal(true);
  };

  const handleDeleteConfirmation = (movieId: string) => {
    const movieToSelect =
      moviesQueryResult?.data.find((m) => m._id === movieId) || null;
    setSelectedMovie(movieToSelect);
    setShowDeleteModal(true);
  };

  const handleDeleteMovie = async () => {
    if (!selectedMovie) return;
    // Add your delete API call here
    console.log("Deleting movie: ", selectedMovie._id);

    setShowDeleteModal(false);
    setSelectedMovie(null);
  };

  if (authLoading || isCheckingAuth || moviesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Admin Dashboard...
      </div>
    );
  }

  if (moviesError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error loading movies. Please try again
      </div>
    );
  }

  const dashboardStats: StatItem[] = [
    {
      title: "Total Movies",
      value: data.stats.totalMovies,
      icon: Film,
      color: "purple",
    },
    {
      title: "Total Reviews",
      value: data.stats.totalReviews,
      icon: Star,
      color: "pink",
    },
    {
      title: "Active Users",
      value: data.stats.totalUsers,
      icon: Users,
      color: "blue",
    },
    {
      title: "Avg Rating",
      value: data.stats.avgRating.toFixed(1),
      icon: BarChart3,
      color: "green",
    },
  ];
  const moviesForTable = moviesQueryResult?.data || [];

  return (
    <div className=" bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors min-h-screen p-20 ">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Admin Dashboard ({data.profile.username})
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 flex items-start space-x-4"
            >
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Manage Movies</h2>
            <Link
              to="/dashboard/movies/create-movie"
              onClick={() => setShowMovieModal(true)}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Movie
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Movie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Director
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {moviesForTable.length > 0 ? (
                  moviesForTable.map((movie: TMovie) => (
                    <tr key={movie._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-12">
                            <img
                              className="h-16 w-12 rounded object-cover"
                              src={movie.poster_url}
                              alt={movie.title}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {movie.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          {movie.genre}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {movie.director}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {movie.release_year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditMovie(movie)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Pencil className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteConfirmation(movie._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No movies found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Movie Modal */}
      {showMovieModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {selectedMovie ? "Edit Movie" : "Add New Movie"}
            </h3>
            {/* Add your movie form here */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowMovieModal(false);
                  setSelectedMovie(null);
                }}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">
                {selectedMovie ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete "{selectedMovie?.title}"?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteMovie}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminDashboard;
