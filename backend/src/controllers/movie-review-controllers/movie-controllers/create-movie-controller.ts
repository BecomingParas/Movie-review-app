import { Request, Response, NextFunction } from "express";
import { CreateMovieSchema } from "../../../services/movie-review-zodSchema";
import { InvalidMovieReviewPayload } from "../../../utils/movie-review-errors";
import { movieMongoService } from "../../../services/MovieService";
import { MovieReviewAppError } from "../../../error";
import { TPayload } from "../../../utils/jwt";
export async function createMovieController(
  req: Request & { user?: TPayload },
  res: Response,
  next: NextFunction
) {
  try {
    const files = req.files as {
      poster_url?: Express.Multer.File[];
      video_url?: Express.Multer.File[];
    };
    if (!files?.poster_url?.[0] || !files?.video_url?.[0]) {
      const invalidPayloadError = new InvalidMovieReviewPayload(
        "Missing files"
      );
      next(invalidPayloadError);
      return;
    }

    const authenticatedUser = req.user as TPayload;
    const body = req.body;
    const parsed = CreateMovieSchema.safeParse(body);
    if (!parsed.success) {
      const parseError = parsed.error.flatten();
      const invalidPayloadError = new InvalidMovieReviewPayload(parseError);
      next(invalidPayloadError);
      return;
    }

    await movieMongoService.createMovie({
      title: parsed.data.title,
      description: parsed.data.description,
      genre: parsed.data.genre,
      director: parsed.data.director,
      poster_url: parsed.data.poster_url,
      video_url: parsed.data.video_url,
      cast: parsed.data.cast,
      release_year: parsed.data.release_year,
      average_rating: parsed.data.average_rating,
      category: parsed.data.category,
      created_by_id: authenticatedUser.id,
    });
    res.status(201).json({
      message: "Movie created successfully",
    });
  } catch (error) {
    console.error(error);
    if ((error as any).errorResponse?.code === 11000) {
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
