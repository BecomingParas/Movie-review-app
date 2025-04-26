import { Request, Response, NextFunction } from "express";
// import { reviewServices } from "../../../services/reviews";
import { createReviewSchema } from "../../../utils/movie-review-zodSchema";
import { InvalidMovieReviewPayload } from "../../../utils/movie-review-errors";
import { MovieReviewAppError } from "../../../error";
import { mongoReviewServices } from "../../../services/review.service";
import { TPayload } from "../../../types/payload.type";

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
      next(new MovieReviewAppError("Unauthorized: No user logged in.", 401));
    }

    await mongoReviewServices.createReview({
      movieId: parsed.data.movieId,
      userId: parsed.data.userId,
      rating: parsed.data.rating,
      review: parsed.data.review,
    });
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
