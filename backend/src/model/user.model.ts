import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    memberSince: {
      type: Date,
      default: Date.now,
    },
    favoriteGenre: {
      type: String,
    },
    stats: {
      moviesWatched: {
        type: Number,
        default: 0,
      },
      watchList: {
        type: Number,
        default: 0,
      },
      reviews: {
        type: Number,
        default: 0,
      },
      hoursWatched: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("User", userSchema);
