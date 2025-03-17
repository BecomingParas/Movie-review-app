import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/authService";

export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  role?: string;
}

export const useAuth = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.getCurrentUser,
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
  };
};
