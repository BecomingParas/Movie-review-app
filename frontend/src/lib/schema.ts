import { z } from "zod";
export const registerSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than the 20 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be less than 20 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
