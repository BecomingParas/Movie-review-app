import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import Index from "@/page/Index";
import MovieDetails from "@/page/MovieDetails";
import NotFound from "@/page/NotFound";
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
import { ProtectedRoute } from "./components/ProtectedRoute";
import { setupAuthInterceptor } from "./services/authInterceptor";
import { useEffect } from "react";

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
        path: "/watchlist",
        element: <Watchlist />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/reviews",
        element: <Reviews />,
      },
      {
        path: "/dashboard",

        element: (
          <ProtectedRoute requiredRole="admin">
            <DashboardPage />
          </ProtectedRoute>
        ),
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
