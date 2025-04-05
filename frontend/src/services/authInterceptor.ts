import { api } from "./api";
import { useAuthStore } from "@/store/authStore";
import { authService } from "./authService";

export const setupAuthInterceptor = () => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const { logout } = useAuthStore.getState();

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { accessToken: newToken } = await authService.refreshToken();
          useAuthStore.setState({ accessToken: newToken });
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          logout();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  api.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });
};
