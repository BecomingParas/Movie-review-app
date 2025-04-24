import { z } from "zod";

const categoryOptions = ["featured", "trending-now", "recent"] as const;

export const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  genre: z.array(z.string()).min(1, "At least one genre is requied"),
  cast: z
    .array(z.string().min(1))
    .min(1, "At least one cast member is required"),
  director: z.string().min(1, "Director name is required"),
  release_year: z.coerce.number().min(1990).max(2025),
  average_rating: z.coerce.number().min(1).max(10),
  category: z.enum(categoryOptions, {
    errorMap: () => ({ message: "Category is required" }),
  }),
  poster_url: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, "Poster is required"),
  video_url: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, "Video is required"),
});
