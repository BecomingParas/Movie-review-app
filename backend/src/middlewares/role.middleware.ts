import { NextFunction, Request, Response } from "express";
import { TPayload } from "../types/payload.type";

export const roleMiddleware =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as TPayload;
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ message: "Forbidden: Insufficient role" });
      return;
    }
    next();
  };
