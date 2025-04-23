// import { Request, Response, NextFunction } from "express";
// import { reviewServices } from "../../../services/reviews";
// import { MovieReviewAppError } from "../../../error";
// import { mongoReviewServices } from "../../../mongo/review/mongoReviewServices";

// export async function getAllReviewController(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     if (process.env.DATABASE_TYPE === "MYSQL") {
//       const reviews = await reviewServices.getAllReviews();

//       res.json({
//         data: reviews,
//         message: "Reviews get all successfully.",
//       });
//     } else {
//       const reviews = await mongoReviewServices.getAllReviews();
//       res.json({
//         data: reviews,
//         message: "Reviews get all successfully",
//       });
//     }
//   } catch (error) {
//     const reviewError = new MovieReviewAppError(
//       "Failed to update the review, Some thing went wrong",
//       500
//     );
//     next(reviewError);
//   }
// }
