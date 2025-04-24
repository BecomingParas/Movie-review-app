import { User } from "@/types/movies.types";
import { api } from "./api";

// ... existing interfaces ...

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    // Add actual logout API call if needed
    await api.post("/auth/logout");
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>("/api/auth/me");
    return response.data;
  },

  refreshToken: async (): Promise<{ accessToken: string }> => {
    const response = await api.post<{ accessToken: string }>("/auth/refresh");
    return response.data;
  },
};
