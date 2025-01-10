import { Express } from "express";
import { createMovieController } from "../controllers/movie-review-controllers/movie-controllers/create-movie-controller";
import { getAllMovieController } from "../controllers/movie-review-controllers/movie-controllers/getAll-movie-controller";
import { updateMovieController } from "../controllers/movie-review-controllers/movie-controllers/update-movie-controller";
import { getMovieByIdController } from "../controllers/movie-review-controllers/movie-controllers/getById-movie-controller";
import { deleteMovieController } from "../controllers/movie-review-controllers/movie-controllers/delete-movie-controller";
export function createMovieRoutes(app: Express) {
  //mutation

  app.post("/movies/create", createMovieController);
  app.put("/movies/update/:movieId", updateMovieController);
  app.delete("/movies/delete/:movieId", deleteMovieController);
  //queries
  app.get("/movies", getAllMovieController);
  app.get("/movies/:movieId", getMovieByIdController);
}
