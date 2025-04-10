import { env } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";

export const useMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await fetch(`${env.BACKEND_URL}/api/movies`);
      if (!res.ok) throw new Error("Failed to fetch movies");
      return res.json();
    },
  });
};
