import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { InputField } from "../ui/InputField";
const registerSchema = z
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

type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterForm() {
  const methods = useForm<RegisterFormData>({
    mode: "all",
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Create Account
        </CardTitle>
        <CardDescription className=" text-center">
          Join our community of movie lovers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form className="space-y-4">
            <InputField
              label="Username"
              name="username"
              placeholder="Enter your username"
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your Email"
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="•••••••"
            />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="•••••••"
            />
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
