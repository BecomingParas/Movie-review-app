import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

function LoginForm() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Log In</CardTitle>
        <CardDescription className=" text-center">
          Sign in to your account to access your profile and reviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <Input
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
