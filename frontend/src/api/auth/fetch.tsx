import { env } from "../../utils/config";
// for register api
export type TRegisterUserInput = {
  username: string;
  email: string;
  password: string;
};
export type TRegisterUserOutput = {
  message: string;
  isSuccess: boolean;
  data: {
    username: string;
    email: string;
    id: string;
  };
};

export async function registerUser(
  input: TRegisterUserInput
): Promise<TRegisterUserOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: input.username,
      email: input.email,
      password: input.password,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

// for login api
export type TLoginUserInput = {
  email: string;
  password: string;
};
export type TUserRole = "admin" | "user";

export type TLoginUserOutput = {
  message: string;
  isSuccess: boolean;
  data: {
    username: string;
    email: string;
    id: string;
    role: TUserRole;
  };
};

export async function loginUser(
  input: TLoginUserInput
): Promise<TLoginUserOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      password: input.password,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}
