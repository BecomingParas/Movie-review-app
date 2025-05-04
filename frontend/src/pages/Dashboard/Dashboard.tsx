// import { useState, useEffect } from "react";
// import { Film, Star, Users, BarChart3, PlusCircle } from "lucide-react";
// import { useAuthStore } from "@/store/auth.store";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   useGetAllMoviesQuery,
//   // useCreateMovieMutation,
// } from "@/api/movies/movie.mutations";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const { user, isAuthenticated, isCheckingAuth, logout } = useAuthStore();
//   const [loading, setLoading] = useState(true);
//   const { data: moviesData } = useGetAllMoviesQuery();
//   const [showMovieModal, setShowMovieModal] = useState(false);
//   const [showDeleteModal] = useState(false);
//   // // const [itemToDelete, setItemToDelete] = useState<{
//   //   id: string;
//   //   type: string;
//   // } | null>(null);

//   useEffect(() => {
//     if (!isCheckingAuth) {
//       if (!isAuthenticated || user?.role !== "admin") {
//         navigate("/login");
//       }
//       setLoading(false);
//     }
//   }, [isAuthenticated, isCheckingAuth, navigate, user]);

//   if (loading || isCheckingAuth) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   const stats = [
//     {
//       title: "Total Movies",
//       value: moviesData?.data.length || 0,
//       icon: Film,
//       color: "purple",
//     },
//     { title: "Total Reviews", value: 245, icon: Star, color: "pink" },
//     { title: "Active Users", value: 1543, icon: Users, color: "blue" },
//     { title: "Avg Rating", value: "4.8", icon: BarChart3, color: "green" },
//   ];

//   // const handleDeleteConfirm = async () => {
//   //   if (!itemToDelete) return;
//   //   setShowDeleteModal(false);
//   //   // delete API call here
//   // };

//   return (
//     <div className="min-h-screen p-20 bg-gray-50">
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
//           <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//           <button
//             onClick={logout}
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow p-6 flex items-start space-x-4"
//             >
//               <div className={`p-3 rounded-full bg-${stat.color}-100`}>
//                 <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">{stat.title}</p>
//                 <p className="text-2xl font-bold">{stat.value}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Movies Section */}
//         <div className="bg-white shadow rounded-lg">
//           <div className="px-6 py-4 border-b flex justify-between items-center">
//             <h2 className="text-xl font-bold">Manage Movies</h2>
//             <Link
//               to="/dashboard/movies/create-movie"
//               onClick={() => setShowMovieModal(true)}
//               className="flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
//             >
//               <PlusCircle className="h-5 w-5 mr-2" />
//               Add Movie
//             </Link>
//           </div>
//           <div className="overflow-x-auto">{/* Movies Table here */}</div>
//         </div>
//       </div>

//       {/* Modals */}
//       {showMovieModal && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex">Movie Modal</div>
//       )}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex">Delete Modal</div>
//       )}
//     </div>
//   );
// };

// const UserDashboard = () => {
//   const { user, logout } = useAuthStore();
//   const [activeTab, setActiveTab] = useState("watchlist");

//   const userStats = [
//     { title: "Watched Movies", value: 42, icon: Film, color: "purple" },
//     { title: "Your Reviews", value: 15, icon: Star, color: "pink" },
//     { title: "Watchlist", value: 23, icon: Users, color: "blue" },
//     { title: "Avg Rating", value: "4.5", icon: BarChart3, color: "green" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
//           <h1 className="text-3xl font-bold">Welcome, {user?.username}</h1>
//           <button
//             onClick={logout}
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {userStats.map((stat, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow p-6 flex items-start space-x-4"
//             >
//               <div className={`p-3 rounded-full bg-${stat.color}-100`}>
//                 <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">{stat.title}</p>
//                 <p className="text-2xl font-bold">{stat.value}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="bg-white shadow rounded-lg">
//           <div className="border-b">
//             <nav className="-mb-px flex">
//               {["watchlist", "reviews"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-6 py-4 font-medium ${
//                     activeTab === tab
//                       ? "border-b-2 border-purple-500 text-purple-600"
//                       : "text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   {tab === "watchlist" ? "Watchlist" : "Your Reviews"}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           <div className="p-6">
//             {activeTab === "watchlist" ? (
//               <div>Your Watchlist Content</div>
//             ) : (
//               <div>Your Reviews Content</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DashboardPage = () => {
//   const { user } = useAuthStore();

//   if (!user) return null;

//   return user.role === "admin" ? <AdminDashboard /> : <UserDashboard />;
// };

// export default DashboardPage;
// src/components/dashboard/DashboardPage.tsx
import { useState, useEffect, ComponentType } from "react";
import {
  Film,
  Star,
  Users,
  BarChart3,
  PlusCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { useGetAllMoviesQuery } from "@/api/movies/movie.mutations";
import { TMovie } from "@/types/movies.types";

interface StatItem {
  title: string;
  value: string | number;
  icon: ComponentType<{ className?: string }>;
  color: "purple" | "pink" | "blue" | "green";
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isCheckingAuth, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const { data: moviesData } = useGetAllMoviesQuery();
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<TMovie | null>(null);

  useEffect(() => {
    if (!isCheckingAuth) {
      if (!isAuthenticated || user?.role !== "admin") {
        navigate("/login");
      }
      setLoading(false);
    }
  }, [isAuthenticated, isCheckingAuth, navigate, user]);

  const handleEditMovie = (movie: TMovie) => {
    setSelectedMovie(movie);
    setShowMovieModal(true);
  };

  const handleDeleteConfirmation = (movieId: string) => {
    setSelectedMovie(moviesData?.data.find((m) => m._id === movieId) || null);
    setShowDeleteModal(true);
  };

  const handleDeleteMovie = async () => {
    if (!selectedMovie) return;
    // Add your delete API call here
    setShowDeleteModal(false);
  };

  if (loading || isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const stats: StatItem[] = [
    {
      title: "Total Movies",
      value: moviesData?.data.length || 0,
      icon: Film,
      color: "purple",
    },
    { title: "Total Reviews", value: 245, icon: Star, color: "pink" },
    { title: "Active Users", value: 1543, icon: Users, color: "blue" },
    { title: "Avg Rating", value: "4.8", icon: BarChart3, color: "green" },
  ];

  return (
    <div className="min-h-screen p-20 bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
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
          {stats.map((stat, index) => (
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
                {moviesData?.data && moviesData.data.length > 0 ? (
                  moviesData.data.map((movie: TMovie) => (
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

const UserDashboard = () => {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"watchlist" | "reviews">(
    "watchlist"
  );

  const userStats: StatItem[] = [
    { title: "Watched Movies", value: 42, icon: Film, color: "purple" },
    { title: "Your Reviews", value: 15, icon: Star, color: "pink" },
    { title: "Watchlist", value: 23, icon: Users, color: "blue" },
    { title: "Avg Rating", value: "4.5", icon: BarChart3, color: "green" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Welcome, {user?.username}</h1>
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
          {userStats.map((stat, index) => (
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
          <div className="border-b">
            <nav className="-mb-px flex">
              {(["watchlist", "reviews"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-purple-500 text-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab === "watchlist" ? "Watchlist" : "Your Reviews"}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "watchlist" ? (
              <div>Your Watchlist Content</div>
            ) : (
              <div>Your Reviews Content</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  return user.role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default DashboardPage;
