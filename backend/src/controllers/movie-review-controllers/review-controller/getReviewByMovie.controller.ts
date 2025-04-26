import { Request, Response, NextFunction } from "express";
import { InvalidMovieReviewPayload } from "../../../utils/movie-review-errors";
import { MovieReviewAppError } from "../../../error";
import { reviewServices } from "../../../services/review.service";

export async function getReviewByMovieIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = req.params.movieId;
    if (!movieId) {
      const invalidPayloadError = new InvalidMovieReviewPayload(movieId);
      next(invalidPayloadError);
      return;
    }
    const reviews = await reviewServices.getReviewByMovieId(movieId);

    res.json({
      data: reviews,
      message: "Reviews of movie get successfully.",
    });
  } catch (error) {
    const reviewError = new MovieReviewAppError(
      "Failded to give the review. something went wrong in server.",
      500
    );
    next(reviewError);
  }
}
