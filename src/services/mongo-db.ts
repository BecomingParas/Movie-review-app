import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";
const db = mongoose.createConnection("mongodb://localhost:27017/", {
  dbName: "movie-review-app",
});
console.log("MongoDb Database connected!!:");

const collections = db.collections;

console.log("collections:", collections);
