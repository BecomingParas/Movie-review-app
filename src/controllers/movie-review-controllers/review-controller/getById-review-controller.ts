import { Request, Response, NextFunction } from "express";
import { reviewServices } from "../../../services/reviews";
import {
  InvalidMovieReviewPayload,
  ReviewNotFound,
} from "../../../services/movie-review-errors";
import { MovieReviewAppError } from "../../../error";

export async function getReviewByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviewId = Number(req.params.reviewId);
    const review = await reviewServices.getByIdReview(reviewId);
    if (!reviewId) {
      const invalidPayloadError = new InvalidMovieReviewPayload(reviewId);
      next(invalidPayloadError);
      return;
    }
    if (!review) {
      const reviewNotFoundError = new ReviewNotFound();
      next(reviewNotFoundError);
      return;
    }

    res.json({
      data: review,
      message: "review get successfully.",
    });
  } catch (error) {
    const reviewError = new MovieReviewAppError(
      "Failed to give the review. something went wrong in server.",
      500
    );
    next(reviewError);
  }
}
