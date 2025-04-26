import { Request, Response, NextFunction } from "express";
import {
  InvalidMovieReviewPayload,
  ReviewNotFound,
  UnAuthorized,
} from "../../../utils/movie-review-errors";
import { MovieReviewAppError } from "../../../error";
import { reviewServices } from "../../../services/review.service";

export async function updateReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviewId = req.params.reviewId;
    const body = req.body;
    if (!reviewId) {
      return next(new InvalidMovieReviewPayload(reviewId));
    }

    const reviewToBeUpdated = await reviewServices.getReviewById(reviewId);
    if (!reviewToBeUpdated) {
      return next(new ReviewNotFound());
    }
    const isUserOwner = req.user?.id === reviewToBeUpdated.userId?.toString();
    console.log({
      isUserOwner,
      user: req.user,
      reviewOwnerId: reviewToBeUpdated.userId?.toString(),
    });
    if (!isUserOwner) {
      const unAuthorizedError = new UnAuthorized();
      next(unAuthorizedError);
      return;
    }

    await reviewServices.updateReview(reviewId, {
      rating: body.rating,
      comments: body.comments,
    });
    res.json({
      message: "Review updated successfully.",
    });
  } catch (error) {
    const reviewerror = new MovieReviewAppError(
      "Failed to update the review. something went wrong in server.",
      500
    );
    next(reviewerror);
  }
}
