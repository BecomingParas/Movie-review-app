import { Request, Response, NextFunction } from "express";
import { userMongoService } from "../../mongo/auth/service";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  // validate the user in database
  const user = userMongoService.getUserByEmail({
    email: body.email,
  });
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  try {
  } catch (error) {
    console.error("Failed to signup", error);
    next(error);
  }
}
