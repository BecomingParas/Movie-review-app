import { JwtPayload, sign, verify } from "jsonwebtoken";
import { TPayload } from "../types/payload.type";
import { EXPIRY_TIME_IN_SECONDS } from "../utils/constant";

function getJwtSecret(): string {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("Please set the secret for jwt");
  }
  return jwtSecret;
}

export function generateToken(payload: TPayload) {
  const token = sign(payload, getJwtSecret(), {
    expiresIn: EXPIRY_TIME_IN_SECONDS,
  });
  return token;
}

export function verifyToken(token: string): TPayload {
  const validatedToken = verify(token, getJwtSecret());
  if (typeof validatedToken !== "object" || validatedToken === null) {
    throw new Error("Invalid or expired token");
  }
  const payload = validatedToken as JwtPayload;
  if (!payload.id || !payload.username || !payload.email) {
    throw new Error("Inavalid JWT payload struture");
  }
  return payload as TPayload;
}
