// type declaration
import { ReviewModel } from "./reviewModel";
import { InvalidMovieReviewPayload } from "../../utils/movie-review-errors";

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

//update the review

async function updateReview(
  toUpdateReviewId: string,
  input: Omit<TReviews, "id" | "movieId" | "userId">
) {
  const review = await ReviewModel.findById(toUpdateReviewId);

  if (!review) {
    throw new Error("Review not found!");
  }
  await ReviewModel.replaceOne(
    {
      _id: toUpdateReviewId,
    },
    {
      // userId: input.userId,
      // movieId: input.movieId,
      rating: input.rating,
      review: input.review,
    }
  );

  // await ReviewModel.updateOne(
  //   {
  //     _id: toUpdateReviewId,
  //   },
  //   {
  //     userId: input.userId,
  //     movieId: input.movieId,
  //     rating: input.rating,
  //     review: input.review,
  //   }
  // );
}

// get all reviews

async function getAllReviews() {
  const reviews = await ReviewModel.find();
  return reviews;
}

// get by id review

async function getByIdReview(toGetReviewId: string) {
  const review = await ReviewModel.findById(toGetReviewId);
  if (!review) {
    throw new Error("Review not found");
  }
  return review;
}

// delete review

async function deleteReview(toDeleteReviewId: string) {
  const review = await ReviewModel.findByIdAndDelete(toDeleteReviewId);
  if (!review) {
    throw InvalidMovieReviewPayload;
  }
  await ReviewModel.deleteOne({
    _id: toDeleteReviewId,
  });

  return review;
}

export const mongoReviewServices = {
  createReview,
  updateReview,
  getAllReviews,
  getByIdReview,
  deleteReview,
};
