import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie";

export function deleteMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const movieId = Number(req.params.movieId);
  movieService.deleteMovie(movieId);

  res.json({
    message: "Movie deleted successfully.",
  });
}
