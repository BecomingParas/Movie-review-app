import { Request, Response, NextFunction } from "express";

import { InvalidMovieReviewPayload } from "../../../utils/movie-review-errors";
import { movieMongoService } from "../../../services/MovieService";
import { MovieReviewAppError } from "../../../error";
import { TPayload } from "../../../utils/jwt";
import { createMovieSchema } from "../../../services/movie-review-zodSchema";
import { uploadFile } from "../../../utils/cloudinaryUpload";
export async function createMovieController(
  req: Request & { user?: TPayload },
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    console.log("Files received:", req.files); // Debugging: Log received files
    const files = req.files as {
      poster_url?: Express.Multer.File[];
      video_url?: Express.Multer.File[];
    };

    if (!files?.poster_url?.[0] || !files?.video_url?.[0]) {
      next(new InvalidMovieReviewPayload("Missing poster or video file"));
      return;
    }

    const [posterFile, videoFile] = [files.poster_url[0], files.video_url[0]];

    const [posterUpload, videoUpload] = await Promise.all([
      uploadFile(posterFile.path, {
        folder: "movie-posters-url",
        resource_type: "image",
      }),
      uploadFile(videoFile.path, {
        folder: "movie-videos-url",
        resource_type: "video",
      }),
    ]);

    const authenticatedUser = req.user as TPayload;

    const parsed = createMovieSchema.safeParse({
      ...req.body,
      poster_url: posterUpload.secure_url,
      video_url: videoUpload.secure_url,
    });

    if (!parsed.success) {
      next(new InvalidMovieReviewPayload(parsed.error.flatten()));
      return;
    }

    const movie = await movieMongoService.createMovie({
      ...parsed.data,
      created_by_id: authenticatedUser.id,
    });

    res.status(201).json({
      message: "Movie created successfully",
      data: movie,
    });
  } catch (error) {
    console.error(error);
    if ((error as any).errorResponse?.code === 11000) {
      next(
        new MovieReviewAppError(
          "Failed to create the movie. please choose a unique title.",
          400
        )
      );
      return;
    }

    next(
      new MovieReviewAppError(
        "Failed to create the movie. something went wrong on the server.",
        500
      )
    );
  }
}
