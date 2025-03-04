import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "../../api/auth/query";
import {
  loginSchema,
  type LoginFormData,
} from "../../utils/validation/authSchemas";
import useAuthStore from "../../store/authStore";
import { successToast, errorToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

/**
 * LoginForm Component
 *
 * @component
 * @description Handles user authentication with form validation and error handling
 *
 * @example
 * ```tsx
 * <LoginForm />
 * ```
 *
 * Features:
 * - Form validation using Zod
 * - Integration with auth API
 * - Error handling and user feedback
 * - Loading states
 * - Redirect after successful login
 *
 * Form Fields:
 * - Email (required, must be valid email)
 * - Password (required, min 6 characters)
 *
 * States:
 * - Loading state during submission
 * - Error states for invalid input
 * - Success state after login
 *
 * Dependencies:
 * - react-hook-form for form handling
 * - zod for validation
 * - react-router-dom for navigation
 * - auth store for state management
 */
export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const loginMutation = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });

      if (response.isSuccess) {
        await login({
          email: data.email,
          password: data.password,
        });
        successToast("Successfully logged in!");
        navigate("/");
      }
    } catch (error) {
      errorToast("Failed to login. Please check your credentials.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full max-w-md mx-auto"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-white mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-red-500"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-red-500"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors
          ${
            isSubmitting
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};
