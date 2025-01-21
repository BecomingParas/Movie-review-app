import { Request, Response, NextFunction } from "express";
import { reviewServices } from "../../../services/reviews";
import {
  InvalidMovieReviewPayload,
  ReviewNotFound,
} from "../../../services/movie-review-errors";
import { MovieReviewAppError } from "../../../error";

export function deleteReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviewId = Number(req.params.reviewId);
    if (!reviewId) {
      const invalidPayLoadError = new InvalidMovieReviewPayload(reviewId);
      next(invalidPayLoadError);
      return;
    }
    const review = reviewServices.getByIdReview(reviewId);
    if (!review) {
      const reviewNotFoundError = new ReviewNotFound();
      next(reviewNotFoundError);
      return;
    }
    reviewServices.deleteReviews(reviewId);
    res.json({
      message: "Movie deleted successfully.",
    });
  } catch (error) {
    const reviewError = new MovieReviewAppError("Not found the ReviewId", 500);
    next(reviewError);
  }
}
