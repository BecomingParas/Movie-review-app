import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/page/Index";
import MovieDetails from "@/page/MovieDetails";
import NotFound from "@/page/NotFound";
import Login from "./page/Login";
import Register from "./page/Register";
import Profile from "./page/Profile";
import About from "./page/About";
import Contact from "./page/Contact";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/movie/:id", // Ensure this comes before the catch-all route
    element: <MovieDetails />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/users/:userId",
    element: <Profile />,
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
    path: "*",
    element: <NotFound />, // This will only trigger for undefined routes
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
