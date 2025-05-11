import { useDashboardQuery } from "@/api/dashboard/dashboard.query";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const DashboardPage = () => {
  const { data: dashboardData, isLoading, error } = useDashboardQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading dashboard: {error.message}</div>;

  if (!dashboardData) return <div>No data available</div>;
  if (dashboardData.role === "admin") {
    return <AdminDashboard data={dashboardData} />;
  } else if (dashboardData.role === "user") {
    return <UserDashboard data={dashboardData} />;
  }
  return <div>Invalid role data.</div>;
};

export default DashboardPage;
