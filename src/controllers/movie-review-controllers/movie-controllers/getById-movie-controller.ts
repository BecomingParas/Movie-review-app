import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie";
import { MovieNotFound } from "../../../services/movie-review-errors";
export async function getMovieByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const movieId = Number(req.params.movieId);
  const movie = await movieService.getByIdMovie(movieId);
  if (!movie) {
    const movieNotFoundError = new MovieNotFound();
    next(movieNotFoundError);
    return;
  }
  res.json({
    data: movie,
    message: "Movie get successfully",
  });
}
