import express from "express";
import { homeController } from "./controllers/home-controller";
import { createMovieRoutes } from "./routes/movie-route";

// json parser
const app = express();
app.use(express.json());

//note routes
createMovieRoutes(app);

app.get("/", homeController);

app.listen(4002, () => {
  console.log("server started at http://localhost:4002");
});
