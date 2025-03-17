import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies, movieKeys } from "@/api/movie/fetch";
import { Button } from "@/components/ui/button";
import { Plus, Users, Film } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { data: moviesData, isLoading } = useQuery({
    queryKey: movieKeys.lists(),
    queryFn: getMovies,
  });

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  const movies = moviesData?.data || [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <div className="flex gap-4">
                <Button asChild>
                  <Link to="/admin/movies/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Movie
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/admin/users">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium">Movies</h2>
                  <Film className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-3xl font-bold mb-2">{movies.length}</p>
                <p className="text-sm text-muted-foreground">
                  Total movies in the database
                </p>
              </div>

              <div className="glass p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium">Users</h2>
                  <Users className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-3xl font-bold mb-2">0</p>
                <p className="text-sm text-muted-foreground">
                  Total registered users
                </p>
              </div>

              <div className="glass p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium">Reviews</h2>
                  <Film className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-3xl font-bold mb-2">0</p>
                <p className="text-sm text-muted-foreground">
                  Total movie reviews
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-medium mb-4">Recent Movies</h2>
              <div className="glass rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                        Release Date
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {movies.slice(0, 5).map((movie) => (
                      <tr
                        key={movie.id}
                        className="border-b border-border/50 last:border-0"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={movie.imageUrl}
                              alt={movie.title}
                              className="h-10 w-10 rounded object-cover mr-3"
                            />
                            <div>
                              <div className="font-medium">{movie.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {movie.director}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span>{movie.rating.toFixed(1)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {new Date(movie.releaseDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/admin/movies/${movie.id}/edit`}>
                              Edit
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
