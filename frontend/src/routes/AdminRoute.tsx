import { useAuthStore } from "@/store/auth.store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "lucide-react";

const AdminRoute = () => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();
  const location = useLocation();

  if (isCheckingAuth) {
    return (
      <div className=" min-h-screen flex items-center justify-center">
        <Loader className=" h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
export default AdminRoute;
