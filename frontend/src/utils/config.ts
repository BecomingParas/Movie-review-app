export const env = {
  NODE_ENV: import.meta.env.NODE_ENV || "development",
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
};

export const BACKEND_URL = env.BACKEND_URL;
