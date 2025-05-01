import { Express } from "express";
import { createReviewController } from "../controllers/movie-review-controllers/review-controller/createReview.controller";
import { updateReviewController } from "../controllers/movie-review-controllers/review-controller/updateReview.controller";
import { deleteReviewController } from "../controllers/movie-review-controllers/review-controller/deleteReview.controller";
import { getAllReviewController } from "../controllers/movie-review-controllers/review-controller/getAllReview.controller";
import { getReviewByMovieIdController } from "../controllers/movie-review-controllers/review-controller/getReviewByMovie.controller";
import { roleMiddleware } from "../middlewares/role.middleware";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { reviewAccessMiddleware } from "../middlewares/reviewAccess.middleware";

export function createReviewRoutes(app: Express) {
  //mutation
  app.post(
    "/reviews/create",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    createReviewController
  );
  app.put(
    "/reviews/update/:reviewId",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    reviewAccessMiddleware,
    updateReviewController
  );
  app.delete(
    "/reviews/delete/:reviewId",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    deleteReviewController
  );

  //queries
  app.get("/reviews", authMiddleware, getAllReviewController);
  app.get("/reviews/:reviewId", authMiddleware, getAllReviewController);
  app.get("/reviews/:movieId", authMiddleware, getReviewByMovieIdController);
}
