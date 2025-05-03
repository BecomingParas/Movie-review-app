import { create } from "zustand";
import { authService } from "@/services/auth.service";
interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}
interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  setIsLoading: (loading: boolean) => void;
  setIsCheckingAuth: (checking: boolean) => void;
  initialize: () => Promise<void>;
}
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: false,
  login: (user, token) => {
    set({ user, accessToken: token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },
  updateUser: (user) => {
    set({ user });
  },
  setIsLoading: (loading) => {
    set({ isLoading: loading });
  },
  setIsCheckingAuth: (checking) => {
    set({ isCheckingAuth: checking });
  },
  initialize: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      set({ isCheckingAuth: false });
      return;
    }
    try {
      const user = await authService.getCurrentUser();
      set({
        user,
        accessToken: token,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      console.log(error);
      localStorage.removeItem("accessToken");
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },
}));
