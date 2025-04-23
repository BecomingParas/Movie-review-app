import { TMovie } from "@/types/movies.types";
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
  const rawToken = localStorage.getItem("token");
  const token = rawToken?.startsWith("Bearer ")
    ? rawToken.split(" ")[1]
    : rawToken;
  // If no token found
  if (!token) {
    throw new Error("No authentication token found");
  }
  const res = await fetch(`${env.BACKEND_URL}/api/movies/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: input,
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create movie");
  }
  return data;
}

export type TGetAllMoviesOutput = {
  message: string;
  data: TMovie[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export async function getAllMovies({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<TGetAllMoviesOutput> {
  const res = await fetch(
    `${env.BACKEND_URL}/api/movies?page=${page}&limit=${limit}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch movies");
  }

  return data;
}
