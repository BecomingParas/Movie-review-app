import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    comments: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ReviewModel = mongoose.model("Review", reviewSchema);
