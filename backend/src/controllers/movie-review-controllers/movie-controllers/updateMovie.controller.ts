import { Request, Response, NextFunction } from "express";

import { MovieReviewAppError } from "../../../error";
import {
  InvalidMovieReviewPayload,
  MovieNotFound,
} from "../../../utils/movie-review-errors";
import { movieMongoService } from "../../../services/movie.service";

export async function updateMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = req.params.movieId;
    const body = req.body;
    if (!movieId) {
      next(new InvalidMovieReviewPayload("Movie ID is required"));
      return;
    }

    const updatedMovie = await movieMongoService.updateMovie(movieId, {
      title: body.title,
      description: body.description,
      release_year: body.release_year,
      genre: body.genre,
      average_rating: body.average_rating,
      director: body.director,
      cast: body.cast,
      poster_url: body.poster_url,
      video_url: body.video_url,
      category: body.category,
    });
    res.status(200).json({
      message: "Movie updated successfully",
      data: updatedMovie,
    });
  } catch (error) {
    next(
      new MovieReviewAppError(
        "Failed to update the movie.something went wrong on the server.",
        500
      )
    );
  }
}
