import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { homeController } from "./controllers/home-controller";
import { createMovieRoutes } from "./routes/movie-route";
import "./db";
import { connectMongoDb } from "./mongo-db";
import { createReviewRoutes } from "./routes/review-route";
import { MovieReviewAppError } from "./error";
import { createAuthRoutes } from "./routes/auth-route";
import cors = require("cors");
import { env } from "process";

connectMongoDb().then(() => {
  console.log(`MongoDb connected!1`);
});

// json parser
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4200"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", homeController);

// // page templates
// app.get("/home", (req, res) => {
//   const homeFile = fs.readFileSync(`${process.cwd()}/pages/home.html`);
//   res.send(homeFile.toString());
// });

//movie routes
createMovieRoutes(app);

//review routes
createReviewRoutes(app);

// auth routes
createAuthRoutes(app);

//global error handler
app.use(
  (
    error: MovieReviewAppError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("error", error);

    res.status(error.status || 500).json({
      message: error.message,
      meta: error.meta,
    });
  }
);

app.listen(env.PORT, () => {
  console.log(`server started at http://localhost:${env.PORT}`);
});
