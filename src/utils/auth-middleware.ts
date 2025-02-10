import { NextFunction, Request, Response } from "express";
import { TPayload, verifyToken } from "./jwt";

export function authMiddlare(
  req: Request & { user?: TPayload },
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.mytoken;
    if (!token) {
      res.status(401).json({
        message: "Token not found",
      });
      return;
    }
    if (typeof token !== "string") {
      res.status(401).json({
        message: "Token is not a string.",
      });
      return;
    }
    const payload = verifyToken(token);

    req.user = payload;

    next();
  } catch (error) {
    console.error(error);
    if ((error as any).name === "TokenExpirdError") {
      next({
        status: 400,
        message: "Token expired",
      });
      return;
    }
    if ((error as any).name === "JsonWebTokenError") {
      next({
        status: 400,
        message: "Invalid token",
      });
      return;
    }
    next({
      message: "Internal server error",
      status: 500,
    });
  }
}
