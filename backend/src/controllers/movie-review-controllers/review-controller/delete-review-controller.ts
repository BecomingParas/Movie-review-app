import { Request, Response, NextFunction } from "express";
import { reviewServices } from "../../../services/reviews";
import {
  InvalidMovieReviewPayload,
  ReviewNotFound,
} from "../../../utils/movie-review-errors";
import { MovieReviewAppError } from "../../../error";
import { mongoReviewServices } from "../../../mongo/review/mongoReviewServices";

export async function deleteReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviewId = req.params.reviewId;
    if (process.env.DATABASE_TYPE === "MYSQL") {
      const numReviewId = Number(reviewId);
      if (!reviewId) {
        const invalidPayLoadError = new InvalidMovieReviewPayload(reviewId);
        next(invalidPayLoadError);
        return;
      }
      const review = await reviewServices.getByIdReview(numReviewId);
      if (!review) {
        const reviewNotFoundError = new ReviewNotFound();
        next(reviewNotFoundError);
        return;
      }
      reviewServices.deleteReviews(numReviewId);
      res.json({
        message: "Movie deleted successfully.",
      });
    } else {
      await mongoReviewServices.deleteReview(reviewId);
      res.json({
        message: "Review deleted successfully.",
      });
    }
  } catch (error) {
    const reviewError = new MovieReviewAppError("Not found the ReviewId", 500);
    next(reviewError);
  }
}
