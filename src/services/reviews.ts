import { conn } from "../db";
import { connPromise } from "./db-promise";
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
  // reviews.push({

  //   id: reviews.length + 1,
  //   movieId: input.movieId,
  //   userId: input.userId,
  //   rating: input.rating,
  //   review: input.review,
  // });

  conn.query(
    `
    INSERT INTO reviews 
    (movieId,userId,rating,review)
    VALUES
    (${input.movieId},${input.userId},${input.rating},"${input.review}");
    
    `,
    (err, result) => {
      if (err) {
        console.error("Error creating movies in db", err);
      } else {
        console.log("Movie created in db", result);
      }
    }
  );
}

// get all the reviews

async function getAllReviews() {
  const conn = await connPromise;
  const [rows] = await conn.execute(
    `
    SELECT * FROM reviews;
    `
  );
  return rows;
}

//get by id review

async function getByIdReview(reviewId: number) {
  // const review = reviews.find((review) => {
  //   if (review.id === reviewId) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });
  // return review;
  const conn = await connPromise;
  const [rows] = await conn.execute(
    `
    SELECT * FROM reviews
    WHERE id = ${reviewId}
    `
  );
  //@ts-ignore
  return rows[0];
}

// update the review

function updateReview(toUpdateReviewId: number, input: Omit<TReviews, "id">) {
  // const updatedReviews = reviews.map((review) => {
  //   if (review.id === toUpdateReviewId) {
  //     return {
  //       id: review.id,
  //       movieId: input.movieId,
  //       userId: input.userId,
  //       rating: input.rating,
  //       review: input.review,
  //     };
  //   } else {
  //     return review;
  //   }
  // });
  // reviews = updatedReviews;
  conn.query(
    `
  UPDATE reviews SET 
  movieId = ${input.movieId},
  userId = ${input.userId},
  rating = ${input.rating},
  review = "${input.review}"
  WHERE
  id = ${toUpdateReviewId};
  `,
    (err, result) => {
      if (err) {
        console.error("Failed to update", err);
      } else {
        console.log("Updated", result);
      }
    }
  );
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
