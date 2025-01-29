import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie";
import {
  InvalidMovieReviewPayload,
  MovieNotFound,
} from "../../../services/movie-review-errors";
import { MovieReviewAppError } from "../../../error";
import { movieMongoService } from "../../../mongo/movie/service";
export async function getMovieByIdController(
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
    let movie;
    if (process.env.DATABASE_TYPE === "MYSQL") {
      const numMovieId = Number(movieId);
      movie = await movieService.getByIdMovie(numMovieId);
      if (!movie) {
        const movieNotFoundError = new MovieNotFound();
        next(movieNotFoundError);
        return;
      }
    } else {
      movie = await movieMongoService.getByIdMovie(movieId);
      return movie;
    }

    res.json({
      data: movie,
      message: "Movie get successfully",
    });
  } catch (error) {
    const movieError = new MovieReviewAppError(
      "Failed to give the movie. something went wrong in server.",
      500
    );
    next(movieError);
  }
}
