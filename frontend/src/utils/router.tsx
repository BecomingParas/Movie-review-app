import {
  createBrowserRouter,
  RouterProvider as RouterProviderD,
} from "react-router-dom";
import HomePage from "../pages/home";
import DashboardPage from "../pages/dashboard";
import Login from "../components/auth/Login";
import MovieListPage from "../pages/movie/MovieListPage";
import Signup from "../components/auth/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/movielist",
    element: <MovieListPage />,
  },
]);
export function RouterProvider() {
  return <RouterProviderD router={router} />;
}
