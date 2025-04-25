import mongoose from "mongoose";
import { date } from "zod";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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

    created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("User", userSchema);

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const RoleModel = mongoose.model("Role", roleSchema);

// Pivot table schema  - userRole

const userRoleSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    role_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserRoleModel = mongoose.model("UserRole", userSchema);
