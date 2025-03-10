import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./page/Index";
import Login from "./page/Login";
import Register from "./page/Register";
import MovieDetails from "./page/MovieDetails";
import Profile from "./page/Profile";
import About from "./page/About";
import Contact from "./page/Contact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
    path: "/movies/:movieId",
    element: <MovieDetails />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
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
    element: <NotFound />,
  },
]);

function App() {
  return;
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>;
}

export default App;
