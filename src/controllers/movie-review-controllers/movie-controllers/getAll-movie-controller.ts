import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie";
import { movieMongoService } from "../../../mongo/movie/mongoMovieService";
import { MovieReviewAppError } from "../../../error";
export async function getAllMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (process.env.DATABASE_TYPE === "MYSQL") {
      const movies = await movieService.getAllMovie();

      res.json({
        data: movies,
        message: "Movie get all successfully.",
      });
    } else {
      const movies = await movieMongoService.getAllMovie();
      res.json({
        data: movies,
        message: "Movies get all successfully",
      });
    }
  } catch (error) {
    const movieError = new MovieReviewAppError(
      "Failed to update the movie.something went wrong in server.",
      500
    );
    next(movieError);
  }
}
