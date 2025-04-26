import { Request, Response, NextFunction } from "express";
import {
  InvalidMovieReviewPayload,
  ReviewNotFound,
} from "../../../utils/movie-review-errors";
import { MovieReviewAppError } from "../../../error";
import { reviewServices } from "../../../services/review.service";

export async function deleteReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviewId = req.params.reviewId;
    if (!reviewId) {
      return next(new InvalidMovieReviewPayload("Invalid Review ID"));
    }
    const deletedReview = await reviewServices.deleteReview(reviewId);
    if (!deletedReview) {
      return next(new ReviewNotFound());
    }
    res.json({
      message: "Review deleted successfully.",
    });
  } catch (error) {
    const reviewError = new MovieReviewAppError("Not found the ReviewId", 500);
    next(reviewError);
  }
}
