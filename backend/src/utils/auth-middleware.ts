import { NextFunction, Request, Response } from "express";
import { TPayload, verifyToken } from "./jwt";
import { tokenService } from "../mongo/auth/token-service";

export async function authMiddlare(
  req: Request & { user?: TPayload },
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader =
      req.headers.authorization || req.cookies["authorization"];
    `Bearer eyldfjldfdlfj.sflsfsj.djfs`;
    if (!authorizationHeader) {
      res.status(401).json({
        message: "Token not found in header",
      });
      return;
    }
    if (typeof authorizationHeader !== "string") {
      res.status(401).json({
        message: "Token is not a string.",
      });
      return;
    }
    const token = authorizationHeader?.split(" ")[1] || "";
    if (!token) {
      res.status(401).json({
        message: "Token not found",
      });
    }

    const payload = verifyToken(token);

    // Match only the raw token with DB
    const tokenInDb = await tokenService.getToken({
      token,
    });
    if (!tokenInDb) {
      res.status(401).json({
        message: "Token not found.It seems you are logged out!!",
      });
      return;
    }

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
