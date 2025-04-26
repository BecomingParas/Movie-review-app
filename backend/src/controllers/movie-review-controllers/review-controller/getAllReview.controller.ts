import { Request, Response, NextFunction } from "express";
import { MovieReviewAppError } from "../../../error";
import { reviewServices } from "../../../services/review.service";

export async function getAllReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviews = await reviewServices.getAllReviews();
    res.json({
      data: reviews,
      message: "Reviews fetched successfully",
    });
  } catch (error) {
    const reviewError = new MovieReviewAppError(
      "Failed to update the review, Some thing went wrong",
      500
    );
    next(reviewError);
  }
}
