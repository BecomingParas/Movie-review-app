import { conn } from "../db";
type TReviews = {
  id: number;
  movieId: number;
  userId: number;
  rating: number;
  review: string;
};

let reviews: TReviews[] = [];

//creating the reviews

function createReviews(input: Omit<TReviews, "id">) {
  reviews.push({
    id: reviews.length + 1,
    movieId: input.movieId,
    userId: input.userId,
    rating: input.rating,
    review: input.review,
  });
}

// get all the reviews

function getAllReviews() {
  return reviews;
}

//get by id review

function getByIdReview(reviewId: number) {
  const review = reviews.find((review) => {
    if (review.id === reviewId) {
      return true;
    } else {
      return false;
    }
  });
  return review;
}

// update the review

function updateReview(toUpdateReviewId: number, input: Omit<TReviews, "id">) {
  const updatedReviews = reviews.map((review) => {
    if (review.id === toUpdateReviewId) {
      return {
        id: review.id,
        movieId: input.movieId,
        userId: input.userId,
        rating: input.rating,
        review: input.review,
      };
    } else {
      return review;
    }
  });
  reviews = updatedReviews;
}

//delete the revies

function deleteReviews(toDeleteMovieId: number) {
  const reviewAfterDelation = reviews.filter((review) => {
    if (review.id === toDeleteMovieId) {
      return false;
    } else {
      return true;
    }
  });
  reviews = reviewAfterDelation;
}

export const reviewServices = {
  createReviews,
  getAllReviews,
  updateReview,
  deleteReviews,
  getByIdReview,
};
