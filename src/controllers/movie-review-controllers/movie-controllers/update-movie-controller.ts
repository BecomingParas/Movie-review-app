import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie";

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
      next({
        status: 404,
        message: "Note not found",
      });
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
    console.error("caught error", error);
    next({
      message: "Failed to update the movie.Something went wrong in server",
    });
  }
}
