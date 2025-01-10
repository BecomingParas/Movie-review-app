import express, { Request, Response, NextFunction } from "express";
import { homeController } from "./controllers/home-controller";
import { createMovieRoutes } from "./routes/movie-route";

// json parser
const app = express();
app.use(express.json());

app.get("/", homeController);

//note routes
createMovieRoutes(app);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("error", error);

  res.status(error.status || 500).json({
    message: error.message,
  });
});

app.listen(4002, () => {
  console.log("server started at http://localhost:4002");
});
