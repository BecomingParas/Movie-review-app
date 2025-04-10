import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { useSignUpUserMutation } from "../../api/auth/query";
import { errorToast, successToast } from "../toaster";
import { useNavigate } from "react-router-dom";
import { FiFilm, FiStar, FiUsers } from "react-icons/fi";
import { useState } from "react";
import { InputField } from "../ui/InputField";

const signupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters."),
    email: z.string().email("Invalid email."),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .max(20),
    confirmPassword: z.string().min(6).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export function SignUpForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const signUpUserMutation = useSignUpUserMutation();

  const methods = useForm<SignupFormData>({
    mode: "all",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    signUpUserMutation.mutateAsync(
      {
        email: data.email,
        username: data.username,
        password: data.password,
      },
      {
        onSuccess(response) {
          successToast(response.message);
          methods.reset();
          navigate("/login");
        },
        onError(error) {
          console.error("error", error);
          errorToast(error.message);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Movie Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to MovieReviews</h1>
          <p className="text-xl text-gray-300 mb-8">
            Join our community of movie enthusiasts
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <FiFilm size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Discover Movies</h3>
                <p className="text-gray-300">Explore our vast collection</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <FiStar size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Write Reviews</h3>
                <p className="text-gray-300">Share your thoughts</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <FiUsers size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Join Community</h3>
                <p className="text-gray-300">Connect with others</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-900 p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-400">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-500 hover:text-blue-400"
              >
                Sign in
              </button>
            </p>
          </div>

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                  <InputField
                    name="username"
                    label="Username"
                    placeholder="Choose a username"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                  <InputField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                  <InputField
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  ></button>
                </div>
              </div>

              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                  <InputField
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                {signUpUserMutation.isPending
                  ? "Creating Account..."
                  : "Create Account"}
              </button>
            </form>
          </FormProvider>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              By signing up, you agree to our{" "}
              <button
                onClick={() => navigate("/terms")}
                className="text-blue-500 hover:text-blue-400"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                onClick={() => navigate("/privacy")}
                className="text-blue-500 hover:text-blue-400"
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
