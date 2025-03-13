import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  username: string;
  email: string;
  avatar?: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      login: (user, token) =>
        set({ user, isAuthenticated: true, accessToken: token }),
      logout: () =>
        set({ user: null, isAuthenticated: false, accessToken: null }),
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: "cinema-auth-storage",
    }
  )
);
