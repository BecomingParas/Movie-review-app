import { z } from "zod";
export const CreateMovieSchema = z.object({
  title: z.string().min(1).max(25),
  description: z.string().min(5).max(255),
  release_year: z.number().min(1990).max(2030),
  genre: z.string().min(1).max(25),
});
