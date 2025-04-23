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
  poster_url: z
    .string()
    .url("Invalid poster URL format")
    .regex(/\.(jpeg|jpg|png)$/i, "Poster must be a JPG or PNG image"),
  video_url: z
    .string()
    .url("Invalid video URL format")
    .regex(/\.(mp4|mov|avi)$/i, "Video must be MP4, MOV, or AVI format"),
  category: z
    .enum(["featured", "trending_now", "recent"])
    .optional()
    .default("featured"),
});
export const createReviewSchema = z.object({
  movieId: z.string().min(1).max(100),
  userId: z.number().min(1).max(100),
  rating: z.number().min(1).max(5),
  review: z.string().min(10).max(255),
});
