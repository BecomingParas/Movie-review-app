import { Express } from "express";
import { createMovieController } from "../controllers/movie-review-controllers/movie-controllers/create-movie-controller";
import { getAllMovieController } from "../controllers/movie-review-controllers/movie-controllers/getAll-movie-controller";
import { updateMovieController } from "../controllers/movie-review-controllers/movie-controllers/update-movie-controller";
import { getMovieByIdController } from "../controllers/movie-review-controllers/movie-controllers/getById-movie-controller";
import { deleteMovieController } from "../controllers/movie-review-controllers/movie-controllers/delete-movie-controller";
import { authMiddlare } from "../utils/auth-middleware";
export function createMovieRoutes(app: Express) {
  //mutation

  app.post("/api/movies/create", authMiddlare, createMovieController);
  app.put("/api/movies/update/:movieId", updateMovieController);
  app.delete("/api/movies/delete/:movieId", deleteMovieController);
  //queries
  app.get("/api/movies", getAllMovieController);
  app.get("/api/movies/:movieId", getMovieByIdController);
}
