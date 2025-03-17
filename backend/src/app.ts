import express from "express";
import cors from "cors";
import { createAuthRoutes } from "./routes/auth-route";
import { createMovieRoutes } from "./routes/movie-route";
import { createReviewRoutes } from "./routes/review-route";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
createAuthRoutes(app);
createMovieRoutes(app);
createReviewRoutes(app);

export default app;
