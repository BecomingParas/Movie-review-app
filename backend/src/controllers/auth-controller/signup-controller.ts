import { Request, Response, NextFunction } from "express";
import { hashPassword } from "../../utils/bcrypt";
import { userMongoService } from "../../mongo/auth/service";

export async function signUpController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    // validation

    //hasing
    const hashedPassword = await hashPassword(body.password);
    console.log("hashedPassword", hashedPassword);
    await userMongoService.createUser({
      username: body.username,
      email: body.email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "You are signed up successfully!",
    });
  } catch (error) {
    console.error("Failed to signup", error);
    next(error);
  }
}
