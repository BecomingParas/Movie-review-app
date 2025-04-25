import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { homeController } from "./controllers/home-controller";
import { createMovieRoutes } from "./routes/movie-route";
// import { createReviewRoutes } from "./routes/review-route";
import { createAuthRoutes } from "./routes/auth-route";
import { MovieReviewAppError } from "./error";

import { env } from "process";

import dotenv from "dotenv";
import { connectMongoDb } from "./config/db";
dotenv.config();

const app = express();
const PORT = env.PORT || 4002;

// Connect to MongoDB
connectMongoDb().then(() => {
  console.log(`MongoDB connected ✅`);
});

// CORS Setup
app.use(
  cors({
    origin: ["http://localhost:4200", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.get("/", homeController);

createMovieRoutes(app);
// createReviewRoutes(app);
createAuthRoutes(app);

// Global Error Handler
app.use(
  (
    error: MovieReviewAppError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error("App error: ", error);

    res.status(error.status || 500).json({
      message: error.message,
      meta: error.meta,
    });
  }
);

// Start Server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT} 🚀`);
});
