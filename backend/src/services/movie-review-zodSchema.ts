import { z } from "zod";
export const CreateMovieSchema = z.object({
  title: z.string().min(1).max(25),
  description: z.string().min(5).max(255),
  release_year: z.number().min(1990).max(2030),
  director: z.string().min(1),
  genre: z.array(z.string().min(1)).min(1),
  cast: z.array(z.string()).min(1),
  poster_url: z.string().url(),
  video_url: z.string().url(),
  average_rating: z.number().optional().default(0),
  created_by_id: z.string().optional(),
  category: z
    .enum(["featured", "top_rated", "recent"])
    .optional()
    .default("featured"),
});

export const createReviewSchema = z.object({
  movieId: z.string().min(1).max(100),
  userId: z.number().min(1).max(100),
  rating: z.number().min(1).max(5),
  review: z.string().min(10).max(255),
});
