import { Request, Response, NextFunction } from "express";

import { MovieNotFound } from "../../../utils/movie-review-errors";
import { MovieReviewAppError } from "../../../error";
import { movieMongoService } from "../../../services/movie.service";

export async function deleteMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = req.params.movieId;

    const movie = await movieMongoService.deleteMovie(movieId);
    if (!movie) {
      return next(new MovieNotFound());
    }
    res.json({
      message: "Movies deleted successfully.",
    });
  } catch (error) {
    const movieError = new MovieReviewAppError("Not found the MoviewID", 500);
    next(movieError);
  }
}
