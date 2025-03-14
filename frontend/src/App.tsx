import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import Index from "@/page/Index";
import MovieDetails from "@/page/MovieDetails";
import NotFound from "@/page/NotFound";
import Login from "@/components/auth/LoginForm";
import About from "./page/About";
import Contact from "./page/Contact";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import SignUpForm from "./components/auth/SignUpForm";
import Reviews from "./page/review";
import Movies from "./page/movies";
import DashboardPage from "./page/Dashboard";
import Watchlist from "./page/WatchList";

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
        element: <DashboardPage />,
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
        element: <Login />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
const App = () => {
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
