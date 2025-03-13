import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterForm() {
  const navigate = useNavigate();
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
  // const { handleSubmit, reset } = methods;
  // const onSubmit = async () => {
  //   try {
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       setServerError(error.message);
  //       errorToast(error.message);
  //     } else {
  //     }
  //   }
  // };

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
            <Button type="submit" className="w-full">
              {}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
