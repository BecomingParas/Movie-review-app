import { env } from "@/utils/config";

export type TSignUpUserInput = {
  username: string;
  email: string;
  password: string;
};

export type TSignUpUserOutput = {
  message: string;
  isSuccess: boolean;
  data: {
    username: string;
    email: string;
    id: string;
  };
};

export async function SignUpUser(
  input: TSignUpUserInput
): Promise<TSignUpUserOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}

export type TLoginUserInput = {
  email: string;
  password: string;
};

export type TLoginUserOutput = {
  message: string;
  isSuccess: boolean;
  data: {
    token: string;
    user: {
      username: string;
      email: string;
      id: string;
      role: string;
    };
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
    body: JSON.stringify(input),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  const token = data.data.token; // already includes Bearer
  localStorage.setItem("accessToken", token); // keep as is

  return data as TLoginUserOutput;
}
