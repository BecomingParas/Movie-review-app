import { Request, Response, NextFunction } from "express";
import { createReviewSchema } from "../../../utils/movie-review-zodSchema";
import { InvalidMovieReviewPayload } from "../../../utils/movie-review-errors";
import { MovieReviewAppError } from "../../../error";
import { TPayload } from "../../../types/payload.type";
import { reviewServices } from "../../../services/review.service";
import updateMovieAverageRating from "../../updateMovieAverageRating";

export async function createReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const parsed = createReviewSchema.safeParse(body);
    if (!parsed.success) {
      const parseError = parsed.error.flatten();
      const invalidPayloadError = new InvalidMovieReviewPayload(parseError);
      next(invalidPayloadError);
      return;
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
    res.json({
      message: "Review added successfully.",
    });
  } catch (error) {
    console.log(error);
    const reviewError = new MovieReviewAppError(
      "Failed to create the review. Something went wrong in server.",
      500
    );
    next(reviewError);
  }
}
