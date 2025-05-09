import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../config/jwt";
import { tokenService } from "../services/token.service";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authorizationHeader =
      req.headers.authorization || req.cookies?.authorization;
    if (!authorizationHeader || typeof authorizationHeader !== "string") {
      res.status(401).json("Authorization token not provided or invalid");
      return;
    }
    console.log("Authorization Headers: ", authorizationHeader);

    const parts = authorizationHeader.trim().split(" ").filter(Boolean);
    let token: string;
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    } else {
      res.status(401).json({
        message:
          "Invalid authorization header format. Expected Expected 'Bearer <token>'",
      });
      return;
    }

    const payload = verifyToken(token);

    const tokenInDb = await tokenService.getToken({ token });
    if (!tokenInDb) {
      res
        .status(401)
        .json({ message: "Token not found.It seems you are logged out!" });
      return;
    }
    req.user = payload;
    next();
  } catch (error) {
    console.log("Authorization error", error);
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ message: "Token expired" });
      return;
    }
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    return next({
      message: "Internal server error",
      status: 500,
    });
  }
}
