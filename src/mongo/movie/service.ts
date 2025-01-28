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

// update the movie

async function updateMovie(toUpdateMovieId: string, input: Omit<TMovie, "id">) {
  const movie = await MovieModel.findById(toUpdateMovieId);
  if (!movie) {
    throw new Error("Movie not found!");
  }
  // we movie to update
  movie.title = input.title;
  movie.description = input.description;
  movie.release_year = input.release_year;
  movie.genre = input.genre;

  await movie.replaceOne(
    {
      _id: toUpdateMovieId,
    },
    {
      title: input.title,
      description: input.description,
      genre: input.genre,
      release_year: input.release_year,
    }
  );
}

export const movieMongoService = {
  createMovie,
  updateMovie,
};
