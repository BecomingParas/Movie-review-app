import { genSalt, hash } from "bcryptjs";

export async function hashPassword(plainTextPassword: string) {
  try {
    const salt = await genSalt(10);
    const hashPassword = await hash(plainTextPassword, salt);
    return hashPassword;
  } catch (error) {
    console.error(error);
    throw new Error("Hashing password failed");
  }
}
