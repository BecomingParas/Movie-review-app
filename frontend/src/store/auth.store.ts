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
  initialize: () => Promise<void>;
}
export const useAuthStore = create<AuthState>((set) => ({}));
