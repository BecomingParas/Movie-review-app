import { Express } from "express";
import { createReviewController } from "../controllers/movie-review-controllers/review-controller/createReview.controller";
import { updateReviewController } from "../controllers/movie-review-controllers/review-controller/updateReview.controller";
import { deleteReviewController } from "../controllers/movie-review-controllers/review-controller/deleteReview.controller";
import { getAllReviewController } from "../controllers/movie-review-controllers/review-controller/getAllReview.controller";
import { getReviewByMovieIdController } from "../controllers/movie-review-controllers/review-controller/getReviewByMovie.controller";
import { roleMiddleware } from "../middlewares/role-middleware";
import { authMiddleware } from "../middlewares/auth-middleware";

export function createReviewRoutes(app: Express) {
  //mutation
  app.post(
    "/reviews/create",
    authMiddleware,
    roleMiddleware(["Admin", "user"]),
    createReviewController
  );
  app.put(
    "/reviews/update/:reviewId",
    authMiddleware,
    roleMiddleware[("Admin", "user")],
    updateReviewController
  );
  app.delete("/reviews/delete/:reviewId", deleteReviewController);

  //queries
  app.get("/reviews", getAllReviewController);
  app.get("/reviews/:reviewId", getAllReviewController);
  app.get("/reviews/:movieId", getReviewByMovieIdController);
}
