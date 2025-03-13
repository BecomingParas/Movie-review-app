import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
<<<<<<< HEAD
import Index from "@/page/Index";
import MovieDetails from "@/page/MovieDetails";
import NotFound from "@/page/NotFound";
import Login from "./page/Login";
import Register from "./page/Register";
import Profile from "./page/Profile";
import About from "./page/About";
import Contact from "./page/Contact";

const queryClient = new QueryClient();
=======
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieList from "./components/movie/MovieList";
import ReviewList from "./components/review/ReviewList";
import MovieDetail from "./components/movie/MovieDetail";
import SignUpForm from "./components/auth/SignUpForm";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/home";

import ContactPage from "./pages/contact/Contact";
import AboutPage from "./pages/about/About";
import DashboardPage from "./pages/dashboard";
>>>>>>> ed3a28e8a194a1af007d60680a8b81eea39cba6f

const router = createBrowserRouter([
  {
    path: "/",
<<<<<<< HEAD
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
=======
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
>>>>>>> ed3a28e8a194a1af007d60680a8b81eea39cba6f
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
