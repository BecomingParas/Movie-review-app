import { Express } from "express";
import { createMovieController } from "../controllers/movie-review-controllers/movie-controllers/create-movie-controller";
import { getAllMovieController } from "../controllers/movie-review-controllers/movie-controllers/getAll-movie-controller";

import { upload } from "../utils/multer";
import { authMiddleware } from "../middlewares/auth-middleware";
import { roleMiddleware } from "../middlewares/role-middleware";
import { updateMovieController } from "../controllers/movie-review-controllers/movie-controllers/update-movie-controller";
import { deleteMovieController } from "../controllers/movie-review-controllers/movie-controllers/delete-movie-controller";
import { getMovieByIdController } from "../controllers/movie-review-controllers/movie-controllers/getById-movie-controller";

export function createMovieRoutes(app: Express) {
  //mutation
  // admin only -create , update and delete  movie hai
  app.post(
    "/api/movies/create",
    authMiddleware,
    roleMiddleware(["admin"]),
    upload.fields([
      { name: "poster_url", maxCount: 1 },
      { name: "video_url", maxCount: 1 },
    ]),
    createMovieController
  );

  app.put(
    "/api/movies/update/:movieId",
    authMiddleware,
    roleMiddleware(["admin"]),
    upload.fields([
      { name: "poster_url", maxCount: 1 },
      { name: "video_url", maxCount: 1 },
    ]),
    updateMovieController
  );
  app.delete(
    "/api/movies/delete/:movieId",
    authMiddleware,
    roleMiddleware(["admin"]),
    deleteMovieController
  );
  // queries;

  // public -can see all movies

  app.get("/api/movies", getAllMovieController);
  app.get("/api/movies/:movieId", getMovieByIdController);
}
