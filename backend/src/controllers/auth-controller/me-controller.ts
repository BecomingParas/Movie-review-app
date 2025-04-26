import { Request, Response } from "express";
import { User } from "../../types/user.type";
import { userMongoService } from "../../services/authUser.service";

export const meController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "unauthorized" });
      return;
    }
    const userId = req.user.id;
    const user = await userMongoService.getUserById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const { password, ...userWithoutPassword } = user.toObject();
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error in me controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
