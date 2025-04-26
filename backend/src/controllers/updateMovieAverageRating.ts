import { MovieModel } from "../model/movie.model";
import { ReviewModel } from "../model/review.model";

async function updateMovieAverageRating(movieId: string) {
  const reviews = await ReviewModel.find({ movie_id: movieId });
  if (reviews.length === 0) {
    await MovieModel.findByIdAndUpdate(movieId, {
      average_rating: 0,
      total_reviews: 0,
    });
    return;
  }
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  await MovieModel.findByIdAndUpdate(movieId, {
    average_rating: parseFloat(averageRating.toFixed(2)),
    total_reviews: reviews.length,
  });
}
export default updateMovieAverageRating;
