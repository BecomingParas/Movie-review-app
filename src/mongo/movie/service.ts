import { MovieModel } from "./model";
type TMovie = {
  id: string;
  title: string;
  description: string;
  release_year: number;
  genre: string;
};

async function createMovie(input: Omit<TMovie, "id">) {
  const movie = new MovieModel({
    title: input.title,
    description: input.description,
    genre: input.genre,
    release_year: input.release_year,
  });
  await movie.save();
  return movie;
}

export const movieMongoService = {
  createMovie,
};
