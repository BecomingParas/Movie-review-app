import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie";
export function createMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  movieService.createMovie({
    title: body.title,
    description: body.description,
    release_year: body.release_year,
    genre: body.genre,
  });

  res.json({
    message: "Movie added successfully.",
  });
}
