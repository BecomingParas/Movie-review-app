import { Request, Response, NextFunction } from "express";
import { reviewServices } from "../../../services/reviews";
import { createReviewSchema } from "../../../services/movie-review-validations";
import { InvalidMovieReviewPayload } from "../../../services/movie-review-errors";

export async function createReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const parsed = createReviewSchema.safeParse(body);
  if (!parsed.success) {
    const parseError = parsed.error.flatten();
    const invalidPayloadError = new InvalidMovieReviewPayload(parseError);
    next(invalidPayloadError);
    return;
  }
  reviewServices.createReviews({
    movieId: parsed.data.movieId,
    userId: parsed.data.userId,
    rating: parsed.data.rating,
    review: parsed.data.review,
  });
  res.json({
    message: "Review added successfully.",
  });
}
