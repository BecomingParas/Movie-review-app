import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
export async function connectMongoDb() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI || "", {
      dbName: "movie-review-app",
    });
    console.log("Mongodb Database connected");
  } catch (error) {
    console.error("Failed to connect to mongodb!!", error);
    process.exit(1);
  }
}
