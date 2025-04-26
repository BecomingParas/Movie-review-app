import { Request, Response, NextFunction } from "express";

import { movieMongoService } from "../../../services/movie.service";
import { MovieReviewAppError } from "../../../error";
export async function getAllMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movies = await movieMongoService.getAllMovie();
    res.json({
      data: movies,
      message: "Movies retrieved successfully",
    });
  } catch (error) {
    const movieError = new MovieReviewAppError(
      "Failed to update the movie.something went wrong in server.",
      500
    );
    next(movieError);
  }
}
