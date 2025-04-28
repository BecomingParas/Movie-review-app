import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import Index from "@/pages/home/Index";
import LoginForm from "@/pages/auth/LoginPage";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import SignUpForm from "./components/auth/SignUpForm";
import Reviews from "./pages/review/review";
import Movies from "./pages/movie/movies";
import DashboardPage from "./pages/Dashboard/Dashboard";
import Watchlist from "./pages/watchlist/WatchList";
import { setupAuthInterceptor } from "./services/authInterceptor";
import { useEffect } from "react";
import MovieForm from "./components/movie-form/movie-create";
import CreateMovie from "./components/movie-form/movie-create";
import NotFound from "./pages/NotFound";
import MovieDetails from "./pages/movie/MovieDetails";
import MovieList from "./pages/movie/MovieList";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

const queryClient = new QueryClient();
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
        element: <Index />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetails />,
      },

      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/signup",
        element: <SignUpForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/reviews",
            element: <Reviews />,
          },
          {
            path: "/watchlist",
            element: <Watchlist />,
          },
        ],
      },
      {
        element: <AdminRoute />,
        children: [
          {
            path: "/movies",
            element: <Movies />,
          },
          {
            path: "/movies/create-movie",
            element: <CreateMovie />,
          },
          {
            path: "/movies/movielist",
            element: <MovieList movies={[]} />,
          },
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/movieform",
            element: <MovieForm />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
const App = () => {
  useEffect(() => {
    setupAuthInterceptor();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
