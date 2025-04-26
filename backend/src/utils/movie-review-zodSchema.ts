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

  poster_url: z.string().url({ message: "Invalid poster URL" }),
  video_url: z.string().url({ message: "Invalid video URL" }),
  category: z.enum(["featured", "trending-now", "recent"]),

  created_by_id: z.string().optional(),
});

export const createReviewSchema = z.object({
  movieId: z.string().min(1, "Movie ID is required"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(10, "Rating cannot exceed 10"),
  comments: z.string().optional(),
});
