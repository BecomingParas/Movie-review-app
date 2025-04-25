import { Request, Response, NextFunction } from "express";

import { MovieReviewAppError } from "../../../error";
import {
  InvalidMovieReviewPayload,
  MovieNotFound,
} from "../../../utils/movie-review-errors";
import { movieMongoService } from "../../../services/MovieService";

export async function updateMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = req.params.movieId;
    const body = req.body;
    if (!movieId) {
      const invalidPayloadError = new InvalidMovieReviewPayload(movieId);
      next(invalidPayloadError);
      return;
    }

    await movieMongoService.updateMovie(movieId, {
      title: body.title,
      description: body.description,
      release_year: body.release_year,
      genre: body.genre,
    });
  } catch (error) {
    const movieError = new MovieReviewAppError(
      "Failed to update the movie. something went wrong in server.",
      500
    );
    next(movieError);
  }
}
