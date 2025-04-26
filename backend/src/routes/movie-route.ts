import { Express } from "express";
import { createMovieController } from "../controllers/movie-review-controllers/movie-controllers/createMovie.controller";
import { getAllMovieController } from "../controllers/movie-review-controllers/movie-controllers/getAllMovie.controller";

import { upload } from "../utils/multer";
import { authMiddleware } from "../middlewares/auth-middleware";

import { updateMovieController } from "../controllers/movie-review-controllers/movie-controllers/updateMovie.controller";
import { deleteMovieController } from "../controllers/movie-review-controllers/movie-controllers/deleteMovie.controller";
import { getMovieByIdController } from "../controllers/movie-review-controllers/movie-controllers/getByIdMovie.controller";
import { roleMiddleware } from "../middlewares/role-middleware";

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
