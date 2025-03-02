import {
  createBrowserRouter,
  RouterProvider as RouterProviderD,
} from "react-router-dom";
import HomePage from "../pages/home";
import RegisterPage from "../pages/register";

import DashboardPage from "../pages/dashboard";
import Login from "../components/auth/Login";

export const router = createBrowserRouter([
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
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);
export function RouterProvider() {
  return <RouterProviderD router={router} />;
}
