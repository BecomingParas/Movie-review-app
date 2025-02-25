import {
  createBrowserRouter,
  RouterProvider as RouterProviderD,
} from "react-router-dom";
import HomePage from "../pages/home";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
import DashboardPage from "../pages/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);
export function RouterProvider() {
  return <RouterProviderD router={router} />;
}
