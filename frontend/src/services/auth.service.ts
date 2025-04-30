import { env } from "@/utils/config";

export type User = {
  id: string;
  email: string;
  username: string;
  role: string;
};

export type LoginData = { email: string; password: string };
export type RegisterData = {
  email: string;
  password: string;
  username: string;
};

type AuthResponse = { user: User; token: string };

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

export const login = async (data: LoginData) => {
  const result = await request<AuthResponse>(
    `${env.BACKEND_URL}/api/auth/login`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  localStorage.setItem("accessToken", result.token);
  return result;
};

export const register = async (data: RegisterData) => {
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

export const getCurrentUser = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No access token found");

  return await request<User>(`${env.BACKEND_URL}/api/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logout = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No access token found");

  await request(`${env.BACKEND_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  localStorage.removeItem("accessToken");
};

export const authService = { login, register, getCurrentUser, logout };
