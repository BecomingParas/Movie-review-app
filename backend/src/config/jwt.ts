import { sign, verify } from "jsonwebtoken";

import { JwtPayload } from "jsonwebtoken";
import { EXPIRY_TIME_IN_SECONDS } from "../utils/constant";
import { TPayload } from "../types/payload.type";

function getJwtSecret(): string {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("Please set the secret for jwt.");
  }
  return jwtSecret;
}

export function generateToken(payload: TPayload) {
  const token = sign(payload, getJwtSecret(), {
    // in second
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
    throw new Error("Invalid JWT payload structure");
  }

  return payload as TPayload;
}
