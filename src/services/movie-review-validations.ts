import { z } from "zod";
export const CreateMovieSchema = z.object({
  title: z.string().min(1).max(25),
  description: z.string().min(5).max(255),
  release_year: z.number().min(1990).max(2030),
  genre: z.string().min(1).max(25),
});

export const createReviewSchema = z.object({
  movieId: z.number().min(1).max(100),
  userId: z.number().min(1).max(100),
  rating: z.number().min(1).max(5),
  review: z.string().min(10).max(255),
});
