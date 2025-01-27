import express, { Request, Response, NextFunction } from "express";
import { homeController } from "./controllers/home-controller";
import { createMovieRoutes } from "./routes/movie-route";

import "./db";
import { connectMongoDb } from "./services/mongo-db";
import { createReviewRoutes } from "./routes/review-route";
import { MovieReviewAppError } from "./error";

// connection mongodb
connectMongoDb();
// json parser
const app = express();
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

app.listen(4002, () => {
  console.log("server started at http://localhost:4002");
});
