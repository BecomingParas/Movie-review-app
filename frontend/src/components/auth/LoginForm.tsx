import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { useLoginUserMutation } from "../../api/auth/auth.query";
import { errorToast, successToast } from "../toaster";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiFilm, FiStar, FiUsers } from "react-icons/fi";
import { useState } from "react";
import { InputField } from "../ui/InputField";
import { useAuthStore } from "@/store/auth.store";

const loginSchema = z.object({
  email: z.string().email("Invalid email."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(20),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const loginUserMutation = useLoginUserMutation();

  const methods = useForm<LoginFormData>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    loginUserMutation.mutateAsync(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess(response) {
          successToast(response.message);
          // Store the actual token from response
          localStorage.setItem("accessToken", response.data.token);

          // Update auth store state
          useAuthStore
            .getState()
            .login(response.data.user, response.data.token);
          methods.reset();
          navigate("/dashboard");
          console.log(response.message);
        },
        onError(error) {
          console.error("error", error);
          errorToast(error.message);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex bg-white text-black dark:bg-gray-900 dark:text-white">
      {/* Left Side - Movie Background */}
      <div className="hidden lg:flex lg:w-1/2  relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-opacity-60"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-xl text-white mb-8">
            Continue your movie journey with us
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <FiFilm size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Track Your Reviews</h3>
                <p className="text-white">Keep up with your movie history</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <FiStar size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Personalized Recommendations</h3>
                <p className="text-gray-300">
                  Get movie suggestions just for you
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <FiUsers size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Connect with Others</h3>
                <p className="text-gray-300">Share your movie experiences</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center  p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-black dark:text-white">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-500 hover:text-blue-400"
              >
                Sign up
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
                    name="email"
                    label="Email:"
                    type="email"
                    placeholder="Enter your email"
                    className=""
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                  <InputField
                    name="password"
                    label="Password:"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 "
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4  text-blue-500 focus:ring-blue-500 border-gray-700 rounded bg-gray-800"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-black dark:text-white"
                  >
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-blue-500 hover:text-blue-400"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                {loginUserMutation.isPending ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </FormProvider>

          <div className="mt-6 text-center">
            <p className="text-black dark:text-white text-sm">
              By signing in, you agree to our{" "}
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

export default LoginForm;
