// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import {
//   Film,
//   Clock,
//   Star,
//   BookMarked,
//   User,
//   ChevronRight,
//   BarChart,
//   Loader,
//   AlertCircle,
//   Users,
//   Database,
//   Gauge,
// } from "lucide-react";
// import { useDashboardQuery } from "@/api/dashboard/dashboard.query";

// const Dashboard = () => {
//   const { data, isLoading, isError } = useDashboardQuery();

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader className="animate-spin h-10 w-10 text-primary" />
//       </div>
//     );
//   }

//   if (isError || !data) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center space-y-4">
//           <AlertCircle className="mx-auto h-10 w-10 text-destructive" />
//           <p>Something went wrong loading your dashboard.</p>
//           <Button onClick={() => window.location.reload()}>Try Again</Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-12">
//       <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
//       <p className="text-muted-foreground mb-6">
//         Welcome back, {data.username ?? "Admin"}!
//       </p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {data.role === "user" ? (
//           <>
//             <StatCard
//               title="Movies Watched"
//               value={data.moviesWatched!}
//               icon={Film}
//             />
//             <StatCard
//               title="Watchlist"
//               value={data.watchlistCount!}
//               icon={BookMarked}
//             />
//             <StatCard title="Reviews" value={data.totalReviews} icon={Star} />
//             <StatCard
//               title="Hours Watched"
//               value={data.hoursWatched!}
//               icon={Clock}
//             />
//           </>
//         ) : (
//           <>
//             <StatCard
//               title="Total Users"
//               value={data.totalUsers!}
//               icon={Users}
//             />
//             <StatCard
//               title="Total Movies"
//               value={data.totalMovies!}
//               icon={Database}
//             />
//             <StatCard title="Reviews" value={data.totalReviews} icon={Star} />
//             <StatCard
//               title="Avg Rating"
//               value={data.avgRating?.toFixed(2) ?? "0.0"}
//               icon={Gauge}
//             />
//           </>
//         )}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <BarChart className="mr-2 h-5 w-5" />
//               Recent Activity
//             </CardTitle>
//             <CardDescription>Latest interactions</CardDescription>
//           </CardHeader>
//           <CardContent>
//             {data.recentActivity.length === 0 ? (
//               <p className="text-muted-foreground text-sm">
//                 No recent activity.
//               </p>
//             ) : (
//               <div className="space-y-4">
//                 {data.recentActivity.map((activity) => (
//                   <div key={activity.id}>
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="text-sm font-medium">{activity.action}</p>
//                         <p className="text-xs text-muted-foreground">
//                           {activity.movieTitle && (
//                             <span>{activity.movieTitle} • </span>
//                           )}
//                           {new Date(activity.time).toLocaleString()}
//                         </p>
//                         {activity.user && (
//                           <p className="text-xs text-muted-foreground">
//                             By: {activity.user}
//                           </p>
//                         )}
//                       </div>
//                       <ChevronRight className="h-4 w-4 text-muted-foreground" />
//                     </div>
//                     <Separator className="mt-2" />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {data.role === "user" && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <User className="mr-2 h-5 w-5" />
//                 Profile Summary
//               </CardTitle>
//               <CardDescription>Your reviewer profile</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <p className="text-sm">
//                 <strong>Username:</strong> {data.username}
//               </p>
//               <p className="text-sm">
//                 <strong>Member Since:</strong>{" "}
//                 {new Date(data.memberSince!).toLocaleDateString()}
//               </p>
//               <p className="text-sm">
//                 <strong>Favorite Genre:</strong> {data.favoriteGenre}
//               </p>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };

// const StatCard = ({
//   title,
//   value,
//   icon: Icon,
// }: {
//   title: string;
//   value: string | number;
//   icon: React.ElementType;
// }) => (
//   <Card>
//     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//       <CardTitle className="text-sm font-medium">{title}</CardTitle>
//       <Icon className="h-4 w-4 text-muted-foreground" />
//     </CardHeader>
//     <CardContent>
//       <div className="text-2xl font-bold">{value}</div>
//     </CardContent>
//   </Card>
// );

// export default Dashboard;
import { useState } from "react";

const AdminDashboard = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "Inception", genre: "Sci-Fi", cast: ["Leonardo DiCaprio"] },
    { id: 2, title: "Titanic", genre: "Romantic", cast: ["Kate Winslet"] },
  ]);
  const [newMovie, setNewMovie] = useState({ title: "", genre: "", cast: "" });
  const [showDialog, setShowDialog] = useState(false);

  const handleAddMovie = () => {
    if (!newMovie.title || !newMovie.genre || !newMovie.cast) {
      alert("All fields are required");
      return;
    }
    const id = movies.length + 1;
    setMovies([...movies, { id, ...newMovie, cast: newMovie.cast.split(",") }]);
    setNewMovie({ title: "", genre: "", cast: "" });
    setShowDialog(false);
    alert("Movie added successfully");
  };

  const handleDeleteMovie = (id: number) => {
    setMovies(movies.filter((movie) => movie.id !== id));
    alert("Movie deleted");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Movies</h2>
          <p className="text-2xl">{movies.length}</p>
        </div>
        {/* Add more cards like Total Reviews, Total Users */}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Movies</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setShowDialog(true)}
        >
          Add Movie
        </button>
      </div>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Movie</h3>
            <input
              type="text"
              placeholder="Title"
              value={newMovie.title}
              onChange={(e) =>
                setNewMovie({ ...newMovie, title: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Genre"
              value={newMovie.genre}
              onChange={(e) =>
                setNewMovie({ ...newMovie, genre: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              placeholder="Cast (comma-separated)"
              value={newMovie.cast}
              onChange={(e) =>
                setNewMovie({ ...newMovie, cast: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleAddMovie}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Genre</th>
              <th className="p-3">Cast</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id} className="border-t">
                <td className="p-3">{movie.title}</td>
                <td className="p-3">{movie.genre}</td>
                <td className="p-3">{movie.cast.join(", ")}</td>
                <td className="p-3">
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded"
                    onClick={() => handleDeleteMovie(movie.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
