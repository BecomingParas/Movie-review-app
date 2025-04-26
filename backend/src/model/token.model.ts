import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  expire_at: {
    type: Date,
    default: () => Date.now() + 1000 * 60 * 60 * 24,
  },
});

export const TokenModel = mongoose.model("Token", tokenSchema);
