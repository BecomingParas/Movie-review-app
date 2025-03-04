import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieList from "./components/movie/MovieList";
import ReviewList from "./components/review/ReviewList";
import MovieDetail from "./components/movie/MovieDetail";
import SignUpForm from "./components/auth/SignUpForm";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/",
        element: <MovieList />,
      },
      {
        path: "/movies",
        element: <MovieList />,
      },
      {
        path: "/reviews",
        element: <ReviewList />,
      },
      {
        path: "/movies/:movieId",
        element: <MovieDetail />,
      },
      {
        path: "/signup",
        element: <SignUpForm />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

const queryclient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryclient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
