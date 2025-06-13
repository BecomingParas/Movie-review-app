import mongoose from "mongoose";

export async function connectMongoDb() {
  const uri = process.env.MONGO_DB_URI;
  if (!uri) {
    console.error("MONGO_DB_URI is not defined in environment variables!");
    process.exit(1);
  }
  try {
    await mongoose.connect(uri, {
      dbName: "movie-review-app",
    });
    console.log("Mongodb Database connected");
  } catch (error) {
    console.error("Failed to connect to mongodb!!", error);
    process.exit(1);
  }
}
