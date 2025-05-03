import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import Index from "@/pages/home/Index";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Reviews from "./pages/review/review";
import Movies from "./pages/movie/movies";
import DashboardPage from "./pages/Dashboard/Dashboard";
import Watchlist from "./pages/watchlist/WatchList";
import { useEffect } from "react";
import CreateMovie from "./components/movie-form/movie-create";
import NotFound from "./pages/NotFound";
import MovieDetails from "./pages/movie/MovieDetails";
import MovieList from "./pages/movie/MovieList";
import AdminRoute from "./routes/AdminRoute";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useAuthStore } from "./store/auth.store";
import { AuthInitializer } from "./components/AuthInitializer";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "@/pages/auth/LoginPage";
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
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/movies/movielist",
        element: <MovieList movies={[]} />,
      },
      {
        path: "/reviews",
        element: <Reviews />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/watchlist",
            element: <Watchlist />,
          },
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
        ],
      },
      {
        element: <AdminRoute />,
        children: [
          {
            path: "/dashboard/movies/create-movie",
            element: <CreateMovie />,
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
    useAuthStore.getState().initialize();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthInitializer>
            <RouterProvider router={router} />
          </AuthInitializer>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
