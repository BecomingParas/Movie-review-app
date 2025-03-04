import { z } from "zod";

/**
 * Login Form Validation Schema
 * @description Validates user login credentials
 *
 * Rules:
 * - Email must be valid and is required
 * - Password must be between 6 and 50 characters
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password is too long"),
});

/**
 * Sign Up Form Validation Schema
 * @description Validates new user registration data
 *
 * Rules:
 * - Username must be between 3 and 30 characters
 * - Email must be valid and is required
 * - Password must be between 6 and 50 characters
 * - Confirm password must match password
 */
export const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username is too long"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password is too long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
