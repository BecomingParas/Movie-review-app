import { SignUpForm } from "../../components/auth/SignUpForm";

export function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="mt-2 text-gray-400">Sign up for a new account</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignupPage;
