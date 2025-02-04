import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie";
import { CreateMovieSchema } from "../../../services/movie-review-validations";
import { InvalidMovieReviewPayload } from "../../../services/movie-review-errors";
import { movieMongoService } from "../../../mongo/movie/mongoMovieService";
import { MovieReviewAppError } from "../../../error";
export async function createMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const parsed = CreateMovieSchema.safeParse(body);
    if (!parsed.success) {
      const parseError = parsed.error.flatten();
      const invalidPayloadError = new InvalidMovieReviewPayload(parseError);
      next(invalidPayloadError);
      return;
    }

    if (process.env.DATABASE_TYPE === "MYSQL") {
      movieService.createMovie({
        title: parsed.data.title,
        description: parsed.data.description,
        release_year: parsed.data.release_year,
        genre: parsed.data.genre,
      });
      res.json({
        message: "Movie added successfully.",
      });
    } else {
      await movieMongoService.createMovie({
        title: parsed.data.title,
        description: parsed.data.description,
        genre: parsed.data.genre,
        release_year: parsed.data.release_year,
      });
    }
    res.json({
      message: "Movie added successfully.",
    });
  } catch (error) {
    console.error(error);
    if ((error as any).errorResponse.code === 11000) {
      const movieError = new MovieReviewAppError(
        "Failed to create the movie.please choose unique title",
        400
      );
      next(movieError);
      return;
    }

    const movieError = new MovieReviewAppError(
      "Failed to create the movie. something went wrong in server",
      500
    );
    next(movieError);
  }
}
