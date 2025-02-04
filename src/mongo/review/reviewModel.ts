import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  movieId: {
    type: mongoose.Types.ObjectId,
    ref: "Movie",
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: Number,
    required: true,
  },
});

export const ReviewModel = mongoose.model("ReviewModel", reviewSchema);
