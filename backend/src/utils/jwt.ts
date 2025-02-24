import { sign, verify } from "jsonwebtoken";
import { EXPIRY_TIME_IN_SECONDS } from "./constant";
export type TPayload = {
  id: string;
  username: string;
  email: string;
};
const jwtSecret = process.env.JWT_SECRET || "";
if (!jwtSecret) {
  throw new Error(`Please set the secret for jwt.`);
}

export function generateToken(payload: TPayload) {
  const token = sign(payload, jwtSecret, {
    // in second
    expiresIn: EXPIRY_TIME_IN_SECONDS,
  });
  return token;
}

export function verifyToken(token: string): TPayload {
  const validatedToken = verify(token, jwtSecret);
  console.log("validatedToken :", validatedToken);
  return validatedToken as TPayload;
}
