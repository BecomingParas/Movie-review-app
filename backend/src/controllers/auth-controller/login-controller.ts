import { Request, Response, NextFunction } from "express";
import { userMongoService } from "../../services/authUser.service";
import { comparePassword } from "../../utils/bcrypt";

import { EXPIRY_TIME_IN_SECONDS } from "../../utils/constant";
import { generateToken } from "../../config/jwt";
import { TPayload } from "../../types/payload.type";
import { tokenService } from "../../services/token.service";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const user = await userMongoService.getUserByEmail({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordCorrect = await comparePassword({
      hashedPassword: user.password,
      plainTextPassword: password,
    });
    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Incorrect email or password" });
      return;
    }
    const userPayload: TPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const token = generateToken(userPayload);

    res.cookie("authorization", `Bearer ${token}`, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + EXPIRY_TIME_IN_SECONDS * 1000),
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    await tokenService.createToken({ userId: user.id, token });
    res.status(200).json({
      data: { token: `Bearer ${token}` },
      message: "You are logged in successfully",
    });
  } catch (error) {
    console.error("Failed to login", error);
    next(error);
  }
}
