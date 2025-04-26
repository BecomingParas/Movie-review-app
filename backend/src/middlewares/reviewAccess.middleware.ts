import { NextFunction, Request, Response } from "express";
import { TPayload } from "../types/payload.type";
import { ReviewModel } from "../model/review.model";

export const reviewAccessMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as TPayload;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (user.role === "admin") {
      return next();
    }
    const reviewId = req.params.reviewId;
    if (!reviewId) {
      res.status(400).json({ message: "Review ID not provided" });
      return;
    }
    const review = await ReviewModel.findById(reviewId);
    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    if (review.userId.toString() !== user.id) {
      res
        .status(403)
        .json({ message: "Forbiden: You can only modify your own review" });
      return;
    }
    next();
  } catch (error) {
    console.error("Review access error:", error);
  }
};
