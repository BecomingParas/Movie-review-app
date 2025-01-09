import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie";
export function getAllMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const movies = movieService.getAllMovie();

  res.json({
    data: movies,
    message: "Movie get all successfully.",
  });
}
