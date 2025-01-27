import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  genre: { type: String, required: true },
  release_year: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

export const MovieModel = mongoose.model("movie", movieSchema);
