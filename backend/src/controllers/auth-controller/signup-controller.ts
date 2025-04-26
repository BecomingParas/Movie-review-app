import { Request, Response, NextFunction } from "express";
import { hashPassword } from "../../utils/bcrypt";
import { userMongoService } from "../../services/authUser.service";

export async function signUpController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, email, password, role } = req.body;

    const hashedPassword = await hashPassword(password);
    console.log("hashedPassword", hashedPassword);
    await userMongoService.createUser({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
    });
    res.status(201).json({
      message: "You are signed up successfully!",
    });
  } catch (error) {
    console.error("Failed to signup", error);
    next(error);
  }
}
