import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpUserMutation } from "../../api/auth/query";
import {
  signupSchema,
  type SignupFormData,
} from "../../utils/validation/authSchemas";
import { successToast, errorToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

/**
 * SignUpForm Component
 *
 * @component
 * @description Handles new user registration with form validation and error handling
 *
 * @example
 * ```tsx
 * <SignUpForm />
 * ```
 *
 * Features:
 * - Form validation using Zod
 * - Password confirmation
 * - Integration with signup API
 * - Error handling and user feedback
 * - Loading states
 * - Redirect after successful registration
 *
 * Form Fields:
 * - Username (required, 3-30 characters)
 * - Email (required, must be valid email)
 * - Password (required, min 6 characters)
 * - Confirm Password (must match password)
 *
 * States:
 * - Loading state during submission
 * - Error states for invalid input
 * - Success state after registration
 *
 * Dependencies:
 * - react-hook-form for form handling
 * - zod for validation
 * - react-router-dom for navigation
 */
export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const signupMutation = useSignUpUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await signupMutation.mutateAsync(data);
      if (response.isSuccess) {
        successToast("Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      errorToast("Failed to create account. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-white mb-1"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          {...register("username")}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-red-500"
          placeholder="Choose a username"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

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
          placeholder="Create a password"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-white mb-1"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-red-500"
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
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
        {isSubmitting ? "Creating Account..." : "Sign Up"}
      </button>
    </form>
  );
};
