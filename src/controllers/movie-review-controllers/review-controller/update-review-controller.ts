import { Request, Response, NextFunction } from "express";
import { reviewServices } from "../../../services/reviews";
import {
  InvalidMovieReviewPayload,
  ReviewNotFound,
} from "../../../services/movie-review-errors";
import { MovieReviewAppError } from "../../../error";

export async function updateReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviewId = Number(req.params.reviewId);
    const body = req.body;
    if (!reviewId) {
      const invalidPayloadError = new InvalidMovieReviewPayload(reviewId);
      next(invalidPayloadError);
      return;
    }

    const review = await reviewServices.getByIdReview(reviewId);
    if (!review) {
      const reviewNotFoundError = new ReviewNotFound();
      next(reviewNotFoundError);
      return;
    }

    reviewServices.updateReview(reviewId, {
      movieId: body.movieId,
      userId: body.userId,
      rating: body.rating,
      review: body.review,
    });

    res.json({
      message: "Movie updated successfully.",
    });
  } catch (error) {
    const reviewerror = new MovieReviewAppError(
      "Failed to update the review. something went wrong in server.",
      500
    );
    next(reviewerror);
  }
}
