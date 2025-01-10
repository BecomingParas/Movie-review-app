import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie";
import { MovieAppError } from "../../../error";
import { MovieNotFound } from "../../../services/movie-errors";

export function updateMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = Number(req.params.movieId);
    const body = req.body;

    const movie = movieService.getByIdMovie(movieId);
    if (!movie) {
      const movieNotFoundError = new MovieNotFound();
      next(movieNotFoundError);
      return;
    }

    movieService.updateMovie(movieId, {
      title: body.title,
      description: body.description,
      release_year: body.release_year,
      genre: body.genre,
    });

    res.json({
      message: "Movie updated successfully.",
    });
  } catch (error) {
    const movieError = new MovieAppError(
      "Failed to update the movie. something went wrong in server.",
      500
    );
    next(movieError);
  }
}
