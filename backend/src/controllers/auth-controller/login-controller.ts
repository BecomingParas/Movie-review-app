import { Request, Response, NextFunction } from "express";
import { userMongoService } from "../../mongo/auth/service";
import { comparePassword } from "../../utils/bcrypt";
import { generateToken, TPayload } from "../../utils/jwt";
import { EXPIRY_TIME_IN_SECONDS } from "../../utils/constant";
import { tokenService } from "../../mongo/auth/token-service";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  // validate the user in database
  const user = await userMongoService.getUserByEmail({
    email: body.email,
  });
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }
  const isPasswordCorrect = await comparePassword({
    hashedPassword: user.password,
    plainTextPassword: body.password,
  });
  if (!isPasswordCorrect) {
    res.status(400).json({
      message: "Incorrect email or password",
    });
    return;
  }
  const userPayload: TPayload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  const token = generateToken(userPayload);
  console.log("generated token", token);
  const bearerToken = `Bearer ${token}`;
  res.cookie("authorization", bearerToken, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + EXPIRY_TIME_IN_SECONDS * 1000),
    sameSite: "lax",
    secure: process.env["ENVIRONMENT"] === "prod",
  });
  await tokenService.createToken({
    userId: user.id,
    token: bearerToken,
  });
  res.status(200).json({
    data: {
      token: bearerToken,
    },
    message: "you are logged in successfully",
  });

  try {
  } catch (error) {
    console.error("Failed to signup", error);
    next(error);
  }
}
