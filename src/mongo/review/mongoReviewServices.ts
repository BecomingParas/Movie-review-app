// type declaration

import { Types } from "mongoose";
import { ReviewModel } from "./reviewModel";

type TReviews = {
  id: string;
  userId: number;
  movieId: string;
  rating: number;
  review: string;
};

// create review

async function createReview(input: Omit<TReviews, "id">) {
  const review = new ReviewModel({
    userId: input.userId,
    movieId: input.movieId,
    rating: input.rating,
    review: input.review,
  });
  await review.save();
}

export const mongoReviewServices = {
  createReview,
};
