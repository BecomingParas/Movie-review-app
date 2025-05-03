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

// export default Dashboard;"use client"
import { useState, useEffect } from "react";
import { Film, Star, Users, BarChart3, PlusCircle } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetAllMoviesQuery,
  // useCreateMovieMutation,
} from "@/api/movies/movie.mutations";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isCheckingAuth, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const { data: moviesData } = useGetAllMoviesQuery();
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [showDeleteModal] = useState(false);
  // // const [itemToDelete, setItemToDelete] = useState<{
  //   id: string;
  //   type: string;
  // } | null>(null);

  useEffect(() => {
    if (!isCheckingAuth) {
      if (!isAuthenticated || user?.role !== "admin") {
        navigate("/login");
      }
      setLoading(false);
    }
  }, [isAuthenticated, isCheckingAuth, navigate, user]);

  if (loading || isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const stats = [
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

  // const handleDeleteConfirm = async () => {
  //   if (!itemToDelete) return;
  //   setShowDeleteModal(false);
  //   // delete API call here
  // };

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

        {/* Movies Section */}
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
          <div className="overflow-x-auto">{/* Movies Table here */}</div>
        </div>
      </div>

      {/* Modals */}
      {showMovieModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex">Movie Modal</div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex">Delete Modal</div>
      )}
    </div>
  );
};

const UserDashboard = () => {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("watchlist");

  const userStats = [
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
              {["watchlist", "reviews"].map((tab) => (
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
