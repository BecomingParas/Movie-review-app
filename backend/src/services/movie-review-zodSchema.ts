import { z } from "zod";

export const createMovieSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
  genre: z.preprocess(
    (val) => (typeof val === "string" ? JSON.parse(val) : val),
    z.array(z.string()).nonempty()
  ),
  director: z.string().min(1, "Director is required"),
  cast: z.preprocess(
    (val) => (typeof val === "string" ? JSON.parse(val) : val),
    z.array(z.string()).nonempty()
  ),
  release_year: z.coerce.number().int().min(1900),
  average_rating: z.coerce.number().min(0).max(10),
  created_by_id: z.string().optional(),
  poster_url: z.any(),
  video_url: z.any(),
  category: z
    .string()
    .refine((val) => ["featured", "trending-now", "recent"].includes(val), {
      message: "Invalid category",
    }),
});
