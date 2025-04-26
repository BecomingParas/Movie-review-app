import { Request, Response, NextFunction } from "express";
import { reviewServices } from "../../../services/reviews";
import {
  InvalidMovieReviewPayload,
  ReviewNotFound,
  UnAuthorized,
} from "../../../utils/movie-review-errors";
import { MovieReviewAppError } from "../../../error";
import { mongoReviewServices } from "../../../services/review.service";
import { strict } from "assert";

export async function updateReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviewId = req.params.reviewId;
    const body = req.body;
    if (!reviewId) {
      const invalidPayloadError = new InvalidMovieReviewPayload(reviewId);
      next(invalidPayloadError);
      return;
    }

    if (process.env.DATABASE_TYPE === "MYSQL") {
      const numReviewId = Number(reviewId);
      const review = await reviewServices.getByIdReview(numReviewId);
      if (!review) {
        const reviewNotFoundError = new ReviewNotFound();
        next(reviewNotFoundError);
        return;
      }

      reviewServices.updateReview(numReviewId, {
        movieId: body.movieId,
        userId: body.userId,
        rating: body.rating,
        review: body.review,
      });

      res.json({
        message: "Movie updated successfully.",
      });
    } else {
      const reviewToBeUpdated = await mongoReviewServices.getByIdReview(
        reviewId
      );
      if (!reviewToBeUpdated) {
        const reviewNotFoundError = new ReviewNotFound();
        next(reviewNotFoundError);
        return;
      }
      const isUserOwner = req.user?.id === reviewToBeUpdated.userId?.toString();
      console.log({
        isUserOwner,
        user: req.user,
        id: reviewToBeUpdated.userId?.toString(),
      });
      if (!isUserOwner) {
        const unAuthorizedError = new UnAuthorized();
        next(unAuthorizedError);
        return;
      }

      await mongoReviewServices.updateReview(reviewId, {
        // movieId: body.movieId,
        // userId: body.userId,
        rating: body.rating,
        review: body.review,
      });
      res.json({
        message: "Review updated successfully.",
      });
    }
  } catch (error) {
    const reviewerror = new MovieReviewAppError(
      "Failed to update the review. something went wrong in server.",
      500
    );
    next(reviewerror);
  }
}
