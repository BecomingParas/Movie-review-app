// type declaration

type TReviews = {
  id: Number;
  userId: string;
  movieId: Number;
  rating: Number;
  review: string;
};

async function createReview(input: Omit<TReviews, "id">) {}
