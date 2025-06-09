import { Request, Response, NextFunction } from "express";
import {
  InvalidMovieReviewPayload,
  ReviewNotFound,
  UnAuthorized,
} from "../../../utils/movie-review-errors";
import { MovieReviewAppError } from "../../../error";
import { reviewServices } from "../../../services/review.service";
import { createReviewSchema } from "../../../utils/movie-review-zodSchema";
import { UserActivityModel } from "../../../model/userActivity.model";

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

    const parsed = createReviewSchema
      .pick({ rating: true, comments: true })
      .safeParse(body);

    if (!parsed.success) {
      return next(new InvalidMovieReviewPayload(parsed.error.flatten()));
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
      return next(new UnAuthorized());
    }

    // Update only allowed fields: rating and comments
    await reviewServices.updateReview(reviewId, {
      rating: parsed.data.rating,
      comments: parsed.data.comments,
    });

    await UserActivityModel.create({
      userId: req.user?.id,
      movieId: reviewToBeUpdated.movieId,
      action: "UPDATE_REVIEW",
      details: `User ${req.user?.email} updated a review`,
    });

    res.json({
      message: "Review updated successfully.",
    });
  } catch (error) {
    return next(
      new MovieReviewAppError(
        "Failed to update the review. Something went wrong in the server.",
        500
      )
    );
  }
}
