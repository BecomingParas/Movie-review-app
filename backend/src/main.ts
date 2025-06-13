import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { homeController } from "./controllers/home.controller";
import { createMovieRoutes } from "./routes/movie.routes";

import { createAuthRoutes } from "./routes/auth.routes";
import { MovieReviewAppError } from "./error";

import { env } from "process";

import dotenv from "dotenv";
dotenv.config();
import { connectMongoDb } from "./config/db";
import { Dashboard } from "./routes/dashboard.routes";

const app = express();
const PORT = env.PORT || 4002;

// Connect to MongoDB
connectMongoDb().then(() => {
  console.log(`MongoDB connected ✅`);
});

// CORS Setup
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:4200",
        "https://movie-review-6u4tpbxic-menu-2a8d524d.vercel.app",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.options("*", cors());

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.get("/", homeController);
// create movoie routes
createMovieRoutes(app);
// createReviewRoutes(app);
createAuthRoutes(app);
// dashboard routes
Dashboard(app);

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
