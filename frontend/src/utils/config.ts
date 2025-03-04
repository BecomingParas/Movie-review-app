/**
 * Environment Configuration
 * @description Central configuration management for the application
 */

/**
 * Environment Variables
 * @type {Object}
 * @property {string} NODE_ENV - Current environment (development/production)
 * @property {string} BACKEND_URL - Backend API endpoint
 */
export const env = {
  /** Current environment */
  NODE_ENV: import.meta.env.NODE_ENV || "development",
  /** Backend API URL with fallback */
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
};

/** Exported backend URL for convenience */
export const BACKEND_URL = env.BACKEND_URL;

/**
 * Configuration Usage:
 *
 * @example
 * ```ts
 * import { BACKEND_URL } from './config';
 *
 * async function fetchData() {
 *   const response = await fetch(`${BACKEND_URL}/api/endpoint`);
 *   return response.json();
 * }
 *
 * // Environment-specific logic
 * if (env.NODE_ENV === 'development') {
 *   console.log('Running in development mode');
 * }
 *
 * // API endpoint construction
 * const apiUrl = `${BACKEND_URL}/api/v1`;
 * const authUrl = `${BACKEND_URL}/auth`;
 * ```
 */

/**
 * API Endpoints
 * @description Common API endpoint paths
 */
export const API_ENDPOINTS = {
  /** Authentication endpoints */
  auth: {
    login: `${BACKEND_URL}/api/auth/login`,
    signup: `${BACKEND_URL}/auth/signup`,
    logout: `${BACKEND_URL}/api/auth/logout`,
  },
  /** Movie-related endpoints */
  movies: {
    list: `${BACKEND_URL}/api/movies`,
    detail: (id: string) => `${BACKEND_URL}/api/movies/${id}`,
    reviews: (id: string) => `${BACKEND_URL}/api/movies/${id}/reviews`,
  },
  /** User-related endpoints */
  users: {
    profile: `${BACKEND_URL}/api/users/profile`,
    reviews: (userId: string) => `${BACKEND_URL}/api/users/${userId}/reviews`,
  },
};

/**
 * Environment-specific configuration
 */
export const CONFIG = {
  /** API request timeout in milliseconds */
  apiTimeout: env.NODE_ENV === "development" ? 5000 : 10000,
  /** Enable debug logging in development */
  enableDebug: env.NODE_ENV === "development",
  /** Cache duration in milliseconds */
  cacheDuration: env.NODE_ENV === "development" ? 60000 : 300000, // 1 min in dev, 5 mins in prod
  /** Maximum retries for API calls */
  maxRetries: env.NODE_ENV === "development" ? 1 : 3,
};
