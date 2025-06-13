// src/services/auth.service.ts
import { env } from "@/utils/config";
import { getAccessToken } from "@/utils/getAccessToken";
export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  username: string;
  email: string;
  password: string;
};
import type { User, AuthResponse } from "@/types/movies.types";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || "Something went wrong");
  }
  return response.json() as Promise<T>;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const result = await request<AuthResponse>(
    `${env.BACKEND_URL}/api/auth/register`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  localStorage.setItem("accessToken", result.token);
  return result;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const result = await request<AuthResponse>(
    `${env.BACKEND_URL}/api/auth/login`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  localStorage.setItem("accessToken", result.token);

  // Normalize the role string to your Role type:
  const normalizedUser: User = {
    ...result.user,
    role: result.user.role === "admin" ? "admin" : "user",
  };

  return { token: result.token, user: normalizedUser };
};

export const getCurrentUser = async (): Promise<User> => {
  const token = getAccessToken();
  if (!token) throw new Error("No access token found");

  const user = await request<User>(`${env.BACKEND_URL}/api/auth/me`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  // Normalize role here too:
  return {
    ...user,
    role: user.role === "admin" ? "admin" : "user",
  };
};

export const logout = async (): Promise<void> => {
  const token = getAccessToken();
  if (!token) throw new Error("No access token found");

  await request(`${env.BACKEND_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  });
  localStorage.removeItem("accessToken");
};

export const authService = { register, login, getCurrentUser, logout };
