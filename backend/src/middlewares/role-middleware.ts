import { NextFunction, Request, Response } from "express";
import { TPayload } from "../config/jwt";

export const roleMiddleware =
  (roles: string[]) =>
  (req: Request & { user?: TPayload }, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
