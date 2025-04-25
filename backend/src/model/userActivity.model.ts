import mongoose from "mongoose";

new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  action: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
});
