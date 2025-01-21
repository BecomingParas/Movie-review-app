import { Request, Response, NextFunction } from "express";
import { reviewServices } from "../../../services/reviews";

export async function getAllReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const revies = await reviewServices.getAllReviews();

  res.json({
    data: revies,
    message: "Reviews get all successfully.",
  });
}
