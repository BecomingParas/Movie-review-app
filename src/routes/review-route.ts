import { Express } from "express";
import { createReviewController } from "../controllers/movie-review-controllers/review-controller/create-review-controller";
import { getAllReviewController } from "../controllers/movie-review-controllers/review-controller/getAll-review-controller";
import { updateReviewController } from "../controllers/movie-review-controllers/review-controller/update-review-controller";
import { getReviewByIdController } from "../controllers/movie-review-controllers/review-controller/getById-review-controller";
import { deleteReviewController } from "../controllers/movie-review-controllers/review-controller/delete-review-controller";

export function createReviewRoutes(app: Express) {
  //mutation
  app.post("/reviews/create", createReviewController);
  app.put("/reviews/update/:reviewId", updateReviewController);
  app.delete("/reviews/delete/:reviewId", deleteReviewController);

  //queries
  app.get("/reviews", getAllReviewController);
  app.get("/reviews/:reviewId", getReviewByIdController);
}
