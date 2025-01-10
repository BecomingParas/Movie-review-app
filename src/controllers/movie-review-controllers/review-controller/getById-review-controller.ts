import { Request, Response, NextFunction } from "express";
import { reviewServices } from "../../../services/reviews";
import { ReviewNotFound } from "../../../services/movie-review-errors";

export function getReviewByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reviewId = Number(req.params.reviewId);
  const review = reviewServices.getByIdReview(reviewId);
  if (!review) {
    const reviewNotFoundError = new ReviewNotFound();
    next(reviewNotFoundError);
    return;
  }

  res.json({
    data: review,
    message: "review get successfully.",
  });
}
