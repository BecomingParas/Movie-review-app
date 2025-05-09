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
  const rawToken = localStorage.getItem("accessToken");
  const token = rawToken?.startsWith("Bearer ")
    ? rawToken
    : `Bearer ${rawToken}`;
  // If no token found
  if (!token) {
    throw new Error("No authentication token found");
  }
  const res = await fetch(`${env.BACKEND_URL}/api/dashboard/movies/create`, {
    method: "POST",
    headers: {
      Authorization: token,
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
};

export async function updateMovie(
  movieId: string,
  input: FormData
): Promise<TCreateMovieOutput> {
  const rawToken = localStorage.getItem("accessToken");
  const token = rawToken?.startsWith("Bearer ")
    ? rawToken
    : `Bearer ${rawToken}`;
  if (!token) {
    throw new Error("No authentication token found");
  }
  const res = await fetch(
    `${env.BACKEND_URL}/api/dashboard/movies/update/${movieId}`,
    {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: input,
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update movie");
  }
  return data;
}

export async function getAllMovies(): Promise<TGetAllMoviesOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/movies`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch movies");
  }
  console.log(data);

  return data;
}

export async function deleteMovie(movieId: string) {
  const rawToken = localStorage.getItem("accessToken");
  const token = rawToken?.startsWith("Bearer ")
    ? rawToken
    : `Bearer ${rawToken}`;
  if (!token) throw new Error("No authentication token found");

  const res = await fetch(
    `${env.BACKEND_URL}/api/dashboard/movies/delete/${movieId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to delete movie");
  }
  return data;
}
