import { Request, Response } from "express";
import { User } from "../../types/user.type";

export const meController = async (req: Request, res: Response) => {
  try {
    // The user data is already attached by the auth middleware
    const user = req.user as User;

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Remove sensitive information
    const { password, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error in me controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
