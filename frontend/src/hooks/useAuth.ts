import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useCallback } from "react";
import { useAuthStore } from "@/store/auth.store";
import { authService, LoginData, RegisterData } from "@/services/auth.service";

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
    isLoading,
    setIsLoading,
    isCheckingAuth,
    setIsCheckingAuth,
  } = useAuthStore();

  // Check if the user is authenticated
  const checkAuth = useCallback(async () => {
    try {
      if (accessToken) {
        const user = await authService.getCurrentUser();
        updateUser(user);
      }
    } catch (error) {
      console.error(error);
      clearAuth();
    } finally {
      setIsCheckingAuth(false);
    }
  }, [accessToken, updateUser, clearAuth, setIsCheckingAuth]);

  useEffect(() => {
    if (!isAuthenticated && accessToken) {
      checkAuth();
    } else {
      setIsCheckingAuth(false);
    }
  }, [isAuthenticated, accessToken, checkAuth, setIsCheckingAuth]);

  // Helper for login/register/logout actions
  const handleAuthAction = async <T extends () => Promise<unknown>>(
    action: T,
    successMessage: string
  ): Promise<Awaited<ReturnType<T>>> => {
    setIsLoading(true);
    try {
      const response = await action();
      toast.success(successMessage);
      return response as Awaited<ReturnType<T>>;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
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
