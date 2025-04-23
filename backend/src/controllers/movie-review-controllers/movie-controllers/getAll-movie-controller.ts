import { Request, Response, NextFunction } from "express";

import { movieMongoService } from "../../../services/MovieService";
import { MovieReviewAppError } from "../../../error";
export async function getAllMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { movies, total } = await movieMongoService.getAllMovie({
      page,
      limit,
    });
    res.json({
      data: movies,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
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
