import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie";
import {
  InvalidMovieReviewPayload,
  MovieNotFound,
} from "../../../services/movie-review-errors";
import { MovieReviewAppError } from "../../../error";

export function deleteMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = Number(req.params.movieId);
    if (!movieId) {
      const invalidPayLoadError = new InvalidMovieReviewPayload(movieId);
      next(invalidPayLoadError);
      return;
    }

    const movie = movieService.getByIdMovie(movieId);
    if (!movie) {
      const movieNotFoundError = new MovieNotFound();
      next(movieNotFoundError);
      return;
    }

    movieService.deleteMovie(movieId);

    res.json({
      message: "Movie deleted successfully.",
    });
  } catch (error) {
    const movieError = new MovieReviewAppError("Not found the MoviewID", 500);
    next(movieError);
  }
}
