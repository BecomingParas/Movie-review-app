import { NextFunction, Request, Response } from "express";
import { tokenService } from "../../mongo/auth/token-service";

export async function logoutController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const loggedinUser = req.user;
    console.log("logged in user", loggedinUser);

    res.clearCookie("authorization");

    await tokenService.deleteToken({
      userId: loggedinUser?.id || "",
      token: req.cookies.authorization,
    });
    res.status(200).json({
      message: "You are logged out",
    });
  } catch (error) {
    console.error(error);
    next({
      status: 500,
      message: (error as Error).message,
    });
  }
}
