import { useAuthStore } from "@/store/authStore";
import { authService, LoginData, RegisterData } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    login: setAuth,
    logout: clearAuth,
  } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data);
      setAuth(response.user, response.token);
      toast.success("Login successful!");
      navigate("/");
      return response;
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to login");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      setAuth(response.user, response.token);
      toast.success("Registration successful!");
      navigate("/");
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to register"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      clearAuth();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };
};
