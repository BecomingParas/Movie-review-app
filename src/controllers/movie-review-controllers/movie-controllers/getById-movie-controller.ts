import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie";
export function getMovieByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const movieId = Number(req.params.movieId);
  const movie = movieService.getByIdMovie(movieId);
  res.json({
    data: movie,
    message: "Movie get successfully",
  });
}
