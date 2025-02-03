import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie";
import { MovieReviewAppError } from "../../../error";
import {
  InvalidMovieReviewPayload,
  MovieNotFound,
} from "../../../services/movie-review-errors";
import { movieMongoService } from "../../../mongo/movie/mongoMovieService";

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

    if (process.env.DATABASE_TYPE === "MYSQL") {
      const numMovieId = Number(movieId);
      const movie = await movieService.getByIdMovie(numMovieId);
      if (!movie) {
        const movieNotFoundError = new MovieNotFound();
        next(movieNotFoundError);
        return;
      }

      movieService.updateMovie(numMovieId, {
        title: body.title,
        description: body.description,
        release_year: body.release_year,
        genre: body.genre,
      });
    } else {
      await movieMongoService.updateMovie(movieId, {
        title: body.title,
        description: body.description,
        release_year: body.release_year,
        genre: body.genre,
      });
    }
    res.json({
      message: "Movie updated successfully.",
    });
  } catch (error) {
    const movieError = new MovieReviewAppError(
      "Failed to update the movie. something went wrong in server.",
      500
    );
    next(movieError);
  }
}
