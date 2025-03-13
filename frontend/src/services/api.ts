import { Movie, Review, PaginatedResponse, ApiResponse, User } from "@/types";
import { useAuthStore } from "@/store/authStore";
import {
  mockMovies,
  mockReviews,
  mockUsers,
  paginateArray,
} from "@/data/mockData";

// Helper function to simulate API delay
const simulateDelay = () => new Promise((resolve) => setTimeout(resolve, 500));

// Helper function to get the auth token
const getAuthToken = () => useAuthStore.getState().accessToken;

// Helper for common fetch options including auth
const getHeaders = () => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

// Type definition for request options
type RequestOptions = {
  params?: Record<string, any>;
};

// Generic GET request with mock data
export const apiGet = async <T>(
  endpoint: string,
  options?: { params?: Record<string, any> }
): Promise<T> => {
  await simulateDelay();

  // Handle different endpoints
  if (endpoint.startsWith("/movies")) {
    if (endpoint === "/movies") {
      const {
        page = 1,
        limit = 10,
        search = "",
        genre = "",
      } = options?.params || {};

      let filteredMovies = [...mockMovies];

      // Apply search filter
      if (search) {
        filteredMovies = filteredMovies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase()) ||
            movie.plot.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Apply genre filter
      if (genre) {
        filteredMovies = filteredMovies.filter((movie) =>
          movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
        );
      }

      return paginateArray(filteredMovies, page, limit) as unknown as T;
    }

    // Single movie
    const movieId = endpoint.split("/")[2];
    const movie = mockMovies.find((m) => m.id === movieId);
    if (!movie) throw new Error("Movie not found");
    return { data: movie } as T;
  }

  if (endpoint.startsWith("/reviews")) {
    const { page = 1, limit = 10 } = options?.params || {};
    return paginateArray(mockReviews, page, limit) as unknown as T;
  }

  if (endpoint.startsWith("/users")) {
    const userId = endpoint.split("/")[2];
    const user = mockUsers.find((u) => u.id === userId);
    if (!user) throw new Error("User not found");
    return { data: user } as T;
  }

  throw new Error("Endpoint not found");
};

// Generic POST request with mock data
export const apiPost = async <T>(endpoint: string, data: any): Promise<T> => {
  await simulateDelay();

  if (endpoint === "/auth/login") {
    const { email, password } = data;
    if (email === "user@example.com" && password === "password") {
      return {
        data: {
          user: mockUsers[0],
          token: "mock-jwt-token",
        },
      } as T;
    }
    throw new Error("Invalid credentials");
  }

  if (endpoint === "/reviews") {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      ...data,
      userId: "1", // Assume first user
      username: mockUsers[0].username,
      userAvatar: mockUsers[0].avatar,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    mockReviews.push(newReview);
    return { data: newReview } as T;
  }

  throw new Error("Endpoint not found");
};

// Generic PUT request with mock data
export const apiPut = async <T>(endpoint: string, data: any): Promise<T> => {
  await simulateDelay();
  throw new Error("Not implemented");
};

// Generic DELETE request with mock data
export const apiDelete = async <T>(endpoint: string): Promise<T> => {
  await simulateDelay();
  throw new Error("Not implemented");
};

// Export combined API methods
export const api = {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  delete: apiDelete,
};
