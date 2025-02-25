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
