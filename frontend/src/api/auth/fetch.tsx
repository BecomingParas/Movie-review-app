import { env } from "@/utils/config";

// for register api

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

export type TLoginUserOutput = {
  message: string;
  isSuccess: boolean;
  data: {
    token: string;
    user: {
      username: string;
      email: string;
      id: string;
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
    body: JSON.stringify({
      email: input.email,
      password: input.password,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  // Store the token from the response
  if (data.data?.token) {
    localStorage.setItem("token", data.data.token);
  }

  return data;
}
