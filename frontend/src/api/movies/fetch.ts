import { env } from "@/utils/config";

export type TCreateMovieInput = FormData;
export type TCreateMovieOutput = {
  message: string;
  isSuccess: boolean;
  data: {
    id: string;
    title: string;
  };
};

export async function createMovie(
  input: TCreateMovieInput
): Promise<TCreateMovieOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/movies/create`, {
    method: "POST",
    body: input,
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create movie");
  }
  return data;
}
