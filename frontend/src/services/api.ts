import { env } from "@/utils/config";
import axios from "axios";

export const api = axios.create({
  baseURL: env.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This is important for cookies
});

// Add auth token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = token; // The token already includes 'Bearer ' prefix
  }
  return config;
});
