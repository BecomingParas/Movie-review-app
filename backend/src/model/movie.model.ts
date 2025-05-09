import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    cast: {
      type: [String],
      required: true,
    },
    release_year: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    average_rating: {
      type: Number,
      default: 0,
    },
    total_reviews: {
      type: Number,
      default: 0,
    },
    poster_url: {
      type: String,
      required: true,
    },
    video_url: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["featured", "trending-now", "recent"],
      required: true,
    },
    created_by_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const MovieModel = mongoose.model("Movie", movieSchema);
