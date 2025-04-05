import { useAuthStore } from "@/store/authStore";
import { authService, LoginData, RegisterData } from "@/services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    isAuthenticated,
    accessToken,
    login: setAuth,
    logout: clearAuth,
    updateUser,
  } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      if (accessToken) {
        const user = await authService.getCurrentUser();
        updateUser(user);
      }
    } catch (error) {
      clearAuth();
    } finally {
      setIsCheckingAuth(false);
    }
  }, [accessToken, clearAuth, updateUser]);

  useEffect(() => {
    if (!isAuthenticated && accessToken) {
      checkAuth();
    } else {
      setIsCheckingAuth(false);
    }
  }, [isAuthenticated, accessToken, checkAuth]);

  const handleAuthAction = async <T extends () => Promise<any>>(
    action: T,
    successMessage: string
  ): Promise<ReturnType<T>> => {
    setIsLoading(true);
    try {
      const response = await action();
      toast.success(successMessage);
      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Operation failed";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    return handleAuthAction(async () => {
      const { user, token } = await authService.login(data);
      setAuth(user, token);
      navigate(location.state?.from?.pathname || "/", { replace: true });
      return user;
    }, "Login successful!");
  };

  const register = async (data: RegisterData) => {
    return handleAuthAction(async () => {
      const { user, token } = await authService.register(data);
      setAuth(user, token);
      navigate("/verify-email", { state: { email: data.email } });
      return user;
    }, "Registration successful!");
  };

  const logout = async () => {
    await handleAuthAction(async () => {
      await authService.logout();
      clearAuth();
      navigate("/login", { state: { from: location }, replace: true });
    }, "Logged out successfully!");
  };

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || isCheckingAuth,
    login,
    register,
    logout,
    updateUser,
  };
};
