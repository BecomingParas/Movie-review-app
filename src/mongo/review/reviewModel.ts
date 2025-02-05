import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  movieId: {
    type: mongoose.Types.ObjectId,
    ref: "movie",
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

export const ReviewModel = mongoose.model("review", reviewSchema);
