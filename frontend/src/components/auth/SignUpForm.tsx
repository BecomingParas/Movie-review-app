import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { InputField } from "../../utils/ui/InputField";
const signupSchema = z.object({
  name: z.string().min(3, "Username must be at least 3 characters."),
  email: z.string().email("Invalid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});
type signupFormData = z.infer<typeof signupSchema>;

export function SignUpForm() {
  const methods = useForm<signupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const onSubmit = (data: signupFormData) => {
    console.log("Signup Data:", data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputField label="Username" name="Username" />
        <InputField label="Email" name="Email" type="email" />
        <InputField label="Passwod" name="Passwod" type="password" />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Sign UP
        </button>
      </form>
    </FormProvider>
  );
}

export default SignUpForm;
