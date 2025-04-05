import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "./ui/Spinner";
import { User } from "@/types/index";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "user" | "admin";
}

export function ProtectedRoute({
  children,
  requiredRole = "user",
}: ProtectedRouteProps) {
  const location = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole === "admin" && (user as User).role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
