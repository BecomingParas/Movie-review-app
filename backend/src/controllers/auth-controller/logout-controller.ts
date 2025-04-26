import { NextFunction, Request, Response } from "express";
import { tokenService } from "../../mongo/auth/token.service";

export async function logoutController(
  req: Request & { user?: { id: string } },
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.authorization;
    const userId = req.user?.id || "";
    res.clearCookie("authorization");
    if (token && userId) {
      await tokenService.deleteToken({ userId, token });
    }

    res.status(200).json({
      message: "You are logged out",
    });
  } catch (error) {
    console.error("Logout error: ", error);
    next({
      status: 500,
      message: (error as Error).message,
    });
  }
}
