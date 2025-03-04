import { toast, ToastOptions } from "react-hot-toast";

/**
 * Default toast configuration
 * @description Common options for all toast notifications
 */
const defaultOptions: ToastOptions = {
  duration: 4000,
  position: "bottom-right",
};

/**
 * Success toast notification
 * @description Display a success message to the user
 *
 * @param {string} message - The message to display
 * @param {ToastOptions} [options] - Optional toast configuration
 *
 * @example
 * ```ts
 * successToast("Profile updated successfully!");
 *
 * // With custom options
 * successToast("Changes saved!", { duration: 3000 });
 * ```
 */
export const successToast = (message: string, options?: ToastOptions) =>
  toast.success(message, {
    ...defaultOptions,
    ...options,
    className: "bg-green-50 text-green-800",
  });

/**
 * Error toast notification
 * @description Display an error message to the user
 *
 * @param {string} message - The error message to display
 * @param {ToastOptions} [options] - Optional toast configuration
 *
 * @example
 * ```ts
 * errorToast("Failed to save changes");
 *
 * // With custom options
 * errorToast("Network error", { duration: 5000 });
 * ```
 */
export const errorToast = (message: string, options?: ToastOptions) =>
  toast.error(message, {
    ...defaultOptions,
    duration: 5000, // Error messages shown longer by default
    ...options,
    className: "bg-red-50 text-red-800",
  });

/**
 * Warning toast notification
 * @description Display a warning message to the user
 *
 * @param {string} message - The warning message to display
 * @param {ToastOptions} [options] - Optional toast configuration
 *
 * @example
 * ```ts
 * warningToast("Your session will expire soon");
 * ```
 */
export const warningToast = (message: string, options?: ToastOptions) =>
  toast(message, {
    ...defaultOptions,
    ...options,
    icon: "⚠️",
    className: "bg-yellow-50 text-yellow-800",
  });

/**
 * Info toast notification
 * @description Display an informational message to the user
 *
 * @param {string} message - The info message to display
 * @param {ToastOptions} [options] - Optional toast configuration
 *
 * @example
 * ```ts
 * infoToast("New features are available!");
 * ```
 */
export const infoToast = (message: string, options?: ToastOptions) =>
  toast(message, {
    ...defaultOptions,
    ...options,
    icon: "ℹ️",
    className: "bg-blue-50 text-blue-800",
  });

/**
 * Loading toast notification
 * @description Display a loading message with spinner
 *
 * @param {string} message - The loading message to display
 * @param {ToastOptions} [options] - Optional toast configuration
 * @returns {string} Toast ID for updating or dismissing
 *
 * @example
 * ```ts
 * const toastId = loadingToast("Saving changes...");
 *
 * // Later, update or dismiss
 * toast.dismiss(toastId);
 * // or
 * successToast("Changes saved!");
 * ```
 */
export const loadingToast = (message: string, options?: ToastOptions) =>
  toast.loading(message, {
    ...defaultOptions,
    ...options,
    className: "bg-gray-50 text-gray-800",
  });

/**
 * Custom toast notification
 * @description Display a custom toast with specified options
 *
 * @param {string} message - The message to display
 * @param {ToastOptions} options - Toast configuration
 *
 * @example
 * ```ts
 * customToast("Custom message", {
 *   icon: "🎉",
 *   className: "bg-purple-50 text-purple-800",
 *   duration: 3000
 * });
 * ```
 */
export const customToast = (message: string, options: ToastOptions) =>
  toast(message, {
    ...defaultOptions,
    ...options,
  });

/**
 * Promise toast handler
 * @description Show loading, success, and error states for async operations
 *
 * @param {Promise<any>} promise - The promise to handle
 * @param {Object} messages - Custom messages for each state
 *
 * @example
 * ```ts
 * promiseToast(
 *   saveData(),
 *   {
 *     loading: "Saving changes...",
 *     success: "Changes saved!",
 *     error: "Failed to save changes"
 *   }
 * );
 * ```
 */
export const promiseToast = <T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string;
    error: string;
  },
) =>
  toast.promise(
    promise,
    {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    },
    defaultOptions,
  );

/**
 * Dismiss all toasts
 * @description Remove all active toast notifications
 *
 * @example
 * ```ts
 * dismissAllToasts();
 * ```
 */
export const dismissAllToasts = () => toast.dismiss();
