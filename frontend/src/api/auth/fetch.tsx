import { env } from "../../utils/config";

/**
 * Sign Up User Input Type
 * @interface
 * @property {string} username - User's chosen username
 * @property {string} email - User's email address
 * @property {string} password - User's chosen password
 */
export type TSignUpUserInput = {
  username: string;
  email: string;
  password: string;
};

/**
 * Sign Up User Output Type
 * @interface
 * @property {string} message - Response message
 * @property {boolean} isSuccess - Whether the operation was successful
 * @property {Object} data - User data
 * @property {string} data.username - User's username
 * @property {string} data.email - User's email
 * @property {string} data.id - User's unique ID
 */
export type TSignUpUserOutput = {
  message: string;
  isSuccess: boolean;
  data: {
    username: string;
    email: string;
    id: string;
  };
};

/**
 * Sign Up User API Call
 *
 * @async
 * @function
 * @description Creates a new user account
 *
 * @param {TSignUpUserInput} input - User registration data
 * @returns {Promise<TSignUpUserOutput>} Registration response
 * @throws {Error} When registration fails
 *
 * @example
 * ```ts
 * try {
 *   const response = await SignUpUser({
 *     username: "john_doe",
 *     email: "john@example.com",
 *     password: "secure123"
 *   });
 * } catch (error) {
 *   console.error(error);
 * }
 * ```
 */
export async function SignUpUser(
  input: TSignUpUserInput,
): Promise<TSignUpUserOutput> {
  // Implementation remains the same
}

/**
 * Login User Input Type
 * @interface
 * @property {string} email - User's email address
 * @property {string} password - User's password
 */
export type TLoginUserInput = {
  email: string;
  password: string;
};

/**
 * User Role Type
 * @type {string}
 */
export type TUserRole = "admin" | "user";

/**
 * Login User Output Type
 * @interface
 * @property {string} message - Response message
 * @property {boolean} isSuccess - Whether the operation was successful
 * @property {Object} data - User data
 * @property {string} data.username - User's username
 * @property {string} data.email - User's email
 * @property {string} data.id - User's unique ID
 * @property {TUserRole} data.role - User's role
 */
export type TLoginUserOutput = {
  message: string;
  isSuccess: boolean;
  data: {
    username: string;
    email: string;
    id: string;
    role: TUserRole;
  };
};

/**
 * Login User API Call
 *
 * @async
 * @function
 * @description Authenticates a user
 *
 * @param {TLoginUserInput} input - User login credentials
 * @returns {Promise<TLoginUserOutput>} Login response
 * @throws {Error} When authentication fails
 *
 * @example
 * ```ts
 * try {
 *   const response = await loginUser({
 *     email: "john@example.com",
 *     password: "secure123"
 *   });
 * } catch (error) {
 *   console.error(error);
 * }
 * ```
 */
export async function loginUser(
  input: TLoginUserInput,
): Promise<TLoginUserOutput> {
  // Implementation remains the same
}
