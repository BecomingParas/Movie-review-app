import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import ReviewList from "./components/review/ReviewList";
import MovieDetail from "./components/movie/MovieDetail";
import SignUpForm from "./components/auth/SignUpForm";
import LoginPage from "./pages/auth/LoginPage";
import Home from "./pages/home/home";

import ContactPage from "./pages/contact/Contact";
import AboutPage from "./pages/about/About";
import DashboardPage from "./pages/dashboard/dashboard";
import { MovieList } from "./components/movie/MovieList";

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
        element: <Home />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/movies",
        element: <MovieList title="All Movies" movies={[]} />,
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
