// import { useState, useEffect, ComponentType } from "react";
// import {
//   Film,
//   Star,
//   Users,
//   BarChart3,
//   PlusCircle,
//   Pencil,
//   Trash2,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuthStore } from "@/store/auth.store";
// import { useGetAllMoviesQuery } from "@/api/movies/movie.mutations";
// import { TMovie } from "@/types/movies.types";

// interface StatItem {
//   title: string;
//   value: string | number;
//   icon: ComponentType<{ className?: string }>;
//   color: "purple" | "pink" | "blue" | "green";
// }

// const UserDashboard = () => {
//   const { user, logout } = useAuthStore();
//   const [activeTab, setActiveTab] = useState<"watchlist" | "reviews">(
//     "watchlist"
//   );

//   const userStats: StatItem[] = [
//     { title: "Watched Movies", value: 42, icon: Film, color: "purple" },
//     { title: "Your Reviews", value: 15, icon: Star, color: "pink" },
//     { title: "Watchlist", value: 23, icon: Users, color: "blue" },
//     { title: "Avg Rating", value: "4.5", icon: BarChart3, color: "green" },
//   ];

//   return (
//     <div className="min-h-screen p-20 bg-gray-50">
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
//               {(["watchlist", "reviews"] as const).map((tab) => (
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

// export default DashboardPage;import { useDashboardQuery } from "@/api/dashboard/dashboard.query";
import { useDashboardQuery } from "@/api/dashboard/dashboard.query";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const DashboardPage = () => {
  const { data: dashboardData, isLoading, error } = useDashboardQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading dashboard</div>;

  // Ensure dashboardData is defined before rendering
  if (!dashboardData) return <div>No data available</div>;

  return dashboardData.role === "admin" ? (
    <AdminDashboard />
  ) : (
    <UserDashboard data={dashboardData} />
  );
};

export default DashboardPage;
