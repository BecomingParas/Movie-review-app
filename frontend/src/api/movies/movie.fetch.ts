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

export type TGetAllMoviesOutput = {
  message: string;
  data: TMovie[];
};

// get token for auth

function getAuthToken(): string {
  const rawToken = localStorage.getItem("accessToken");
  if (!rawToken) throw new Error("No authentication token found");
  return rawToken.startsWith("Bearer ") ? rawToken : `Bearer ${rawToken}`;
}

// create movie

export async function createMovie(
  input: TCreateMovieInput
): Promise<TCreateMovieOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/movies/create`, {
    method: "POST",
    headers: {
      Authorization: getAuthToken(),
    },
    body: input,
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create movie");
  }
  return data;
}

// update movie

export async function updateMovie(
  movieId: string,
  input: FormData
): Promise<TCreateMovieOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/movies/update/${movieId}`, {
    method: "PUT",
    headers: {
      Authorization: getAuthToken(),
    },
    body: input,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update movie");
  }
  return data;
}

// get all movies

export async function getAllMovies(): Promise<TGetAllMoviesOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/movies`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch movies");
  }
  console.log(data);

  return data;
}

// delete movie

export async function deleteMovie(
  movieId: string
): Promise<Omit<TCreateMovieOutput, "data">> {
  const res = await fetch(`${env.BACKEND_URL}/api/movies/delete/${movieId}`, {
    method: "DELETE",
    headers: {
      Authorization: getAuthToken(),
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to delete movie");
  }
  return data;
}

export async function getMovieById(movieId: string) {
  await fetch(`${env.BACKEND_URL}/api/moovies/${movieId}`);
}
