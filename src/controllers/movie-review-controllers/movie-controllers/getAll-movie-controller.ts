import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie";
export async function getAllMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const movies = await movieService.getAllMovie();

  res.json({
    data: movies,
    message: "Movie get all successfully.",
  });
}
