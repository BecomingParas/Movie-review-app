import { Request, Response, NextFunction } from "express";
import { reviewServices } from "../../../services/reviews";
import { createReviewSchema } from "../../../services/movie-review-validations";
import { InvalidMovieReviewPayload } from "../../../services/movie-review-errors";
import { MovieReviewAppError } from "../../../error";
import { mongoReviewServices } from "../../../mongo/review/mongoReviewServices";

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

    if (process.env.DATABASE_TYPE === "MYSQL") {
      await reviewServices.createReviews({
        movieId: Number(parsed.data.movieId),
        userId: parsed.data.userId,
        rating: parsed.data.rating,
        review: parsed.data.review,
      });
      res.json({
        message: "Review added successfully.",
      });
    } else {
      await mongoReviewServices.createReview({
        movieId: parsed.data.movieId,
        userId: parsed.data.userId,
        rating: parsed.data.rating,
        review: parsed.data.review,
      });
      res.json({
        message: "Review added successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    const reviewError = new MovieReviewAppError(
      "Failed to create the review. Something went wrong in server.",
      500
    );
    next(reviewError);
  }
}
