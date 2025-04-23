// import { Request, Response, NextFunction } from "express";
// import { reviewServices } from "../../../services/reviews";
// import {
//   InvalidMovieReviewPayload,
//   ReviewNotFound,
// } from "../../../utils/movie-review-errors";
// import { MovieReviewAppError } from "../../../error";
// import { mongoReviewServices } from "../../../mongo/review/mongoReviewServices";

// export async function getReviewByIdController(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     if (process.env.DATABASE_TYPE === "MYSQL") {
//       const reviewId = Number(req.params.reviewId);
//       if (!reviewId) {
//         const invalidPayloadError = new InvalidMovieReviewPayload(reviewId);
//         next(invalidPayloadError);
//         return;
//       }
//       const review = await reviewServices.getByIdReview(reviewId);

//       if (!review) {
//         const reviewNotFoundError = new ReviewNotFound();
//         next(reviewNotFoundError);
//         return;
//       }

//       res.json({
//         data: review,
//         message: "Review get by Id successfully.",
//       });
//     } else {
//       const reviewId = req.params.reviewId;
//       if (!reviewId) {
//         const invalidPayloadError = new InvalidMovieReviewPayload(reviewId);
//         next(invalidPayloadError);
//         return;
//       }
//       const review = await mongoReviewServices.getByIdReview(reviewId);
//       if (!review) {
//         const reviewNotFoundError = new ReviewNotFound();
//         next(reviewNotFoundError);
//         return;
//       }
//       res.json({
//         data: review,
//         message: "Review get by Id successfully.",
//       });
//     }
//   } catch (error) {
//     const reviewError = new MovieReviewAppError(
//       "Failed to give the review. something went wrong in server.",
//       500
//     );
//     next(reviewError);
//   }
// }
