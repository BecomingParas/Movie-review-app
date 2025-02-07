import { sign } from "jsonwebtoken";
type TPayload = {
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
    expiresIn: 60,
  });
  return token;
}
