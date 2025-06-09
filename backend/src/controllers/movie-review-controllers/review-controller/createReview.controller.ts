import { Request, Response, NextFunction } from "express";
import { createReviewSchema } from "../../../utils/movie-review-zodSchema";
import { InvalidMovieReviewPayload } from "../../../utils/movie-review-errors";
import { MovieReviewAppError } from "../../../error";
import { TPayload } from "../../../types/payload.type";
import { reviewServices } from "../../../services/review.service";
import updateMovieAverageRating from "../../updateMovieAverageRating";
import { UserActivityModel } from "../../../model/userActivity.model";

export async function createReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const parsed = createReviewSchema.safeParse(body);
    if (!parsed.success) {
      return next(new InvalidMovieReviewPayload(parsed.error.flatten()));
    }
    // check
    const loggedinUser = req.user as TPayload;
    console.log(loggedinUser);
    if (!loggedinUser) {
      return next(
        new MovieReviewAppError("Unauthorized: No user logged in.", 401)
      );
    }

    await reviewServices.createReview({
      movieId: parsed.data.movieId,
      userId: loggedinUser.id,
      rating: parsed.data.rating,
      comments: parsed.data.comments,
    });
    await updateMovieAverageRating(parsed.data.movieId);

    await UserActivityModel.create({
      userId: loggedinUser.id,
      movieId: parsed.data.movieId,
      action: "CREATE_REVIEW",
      details: `User ${loggedinUser.email} added a review.`,
    });
    res.json({
      message: "Review added successfully.",
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return next(
        new MovieReviewAppError("You have already reviewed this movie.", 400)
      );
    }
    return next(
      new MovieReviewAppError(
        "Failed to create the review. something went wrong in server.",
        500
      )
    );
  }
}
