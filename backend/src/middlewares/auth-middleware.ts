import { NextFunction, Request, Response } from "express";
import { tokenService } from "../mongo/auth/token-service";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { verifyToken } from "../config/jwt";
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authorizationHeader =
      req.headers.authorization || req.cookies?.authorization;

    if (!authorizationHeader || typeof authorizationHeader !== "string") {
      res
        .status(401)
        .json({ message: "Authorization token not provided or invalid" });
      return;
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token not found" });
      return;
    }

    const payload = verifyToken(token);
    const tokenInDb = await tokenService.getToken({ token });

    if (!tokenInDb) {
      res
        .status(401)
        .json({ message: "Token not found. It seems you are logged out!" });
      return;
    }

    req.user = payload;
    next();
  } catch (error) {
    console.error("Authorization error: ", error);

    if (error instanceof TokenExpiredError) {
      res.status(401).json({ message: "Token expired" });
      return;
    }

    if (error instanceof JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    next({
      message: "Internal server error",
      status: 500,
    });
  }
}
