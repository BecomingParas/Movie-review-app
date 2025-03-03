import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { InputField } from "../../utils/ui/InputField";
import { useSignUpUserMutation } from "../../api/auth/query";
import { errorToast, successToast } from "../toaster";
import { useNavigate } from "react-router-dom";

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
    console.log("Signup Data:", data);
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
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex justify-center items-center min-h-screen"
      >
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border hover:border-slate-700">
          <div>
            <h1 className=" text-3xl font-bold text-center text-black mb-6">
              Sign Up
            </h1>
            <div className=" space-y-4">
              <InputField
                label="Username"
                name="username"
                placeholder="Enter your username"
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
              />
            </div>
            <div>
              <p>Already have an account? </p>
              <button
                type="button"
                className=" text-blue-500 hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 focus:ring-2 focus:ring-blue-700 focus:outline-none  mt-4"
            >
              {signUpUserMutation.isPending ? "Signuping..." : "Sign Up"}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default SignUpForm;
