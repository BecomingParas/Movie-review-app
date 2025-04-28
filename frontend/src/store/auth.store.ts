import { create } from "zustand";
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
}
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,
  login: (user, token) =>
    set({ user, accessToken: token, isAuthenticated: true }),
  logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
  updateUser: (user) => set({ user }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setIsCheckingAuth: (checking) => set({ isCheckingAuth: checking }),
}));
