import { Request, Response, NextFunction } from "express";

import {
  InvalidMovieReviewPayload,
  MovieNotFound,
} from "../../../utils/movie-review-errors";
import { MovieReviewAppError } from "../../../error";
import { movieMongoService } from "../../../services/movie.service";
export async function getMovieByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = req.params.movieId;
    if (!movieId) {
      return next(new InvalidMovieReviewPayload("Invalid movie ID"));
    }
    const movie = await movieMongoService.getByIdMovie(movieId);
    if (!movie) {
      const movieNotFoundError = new MovieNotFound();
      next(movieNotFoundError);
      return;
    }
    res.json({
      data: movie,
      message: "Movie fetched successfully by ID.",
    });
  } catch (error) {
    const movieError = new MovieReviewAppError(
      "Failed to give the movie. something went wrong in server.",
      500
    );
    next(movieError);
  }
}
