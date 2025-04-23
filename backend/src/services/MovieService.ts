import { MovieModel } from "../model/movieModel";
import { InvalidMovieReviewPayload } from "../utils/movie-review-errors";

import { TMovies } from "../types/movie.type";
//create movie

async function createMovie(input: Omit<TMovies, "id">) {
  const movie = new MovieModel({
    title: input.title,
    description: input.description,
    genre: input.genre,
    director: input.director,
    release_year: input.release_year,
    average_rating: input.average_rating,
    cast: input.cast,
    poster_url: input.poster_url,
    video_url: input.video_url,
    category: input.category,
  });
  await movie.save();
  return movie;
}

// update the movie

async function updateMovie(
  toUpdateMovieId: string,
  input: Omit<TMovies, "id">
) {
  const movie = await MovieModel.findById(toUpdateMovieId);
  if (!movie) {
    throw InvalidMovieReviewPayload;
  }

  // await MovieModel.replaceOne(
  //   {
  //     _id: toUpdateMovieId,
  //   },
  //   {
  //     title: input.title,
  //     description: input.description,
  //     genre: input.genre,
  //     release_year: input.release_year,
  //   }
  // );

  await MovieModel.updateOne(
    {
      _id: toUpdateMovieId,
    },
    {
      title: input.title,
      description: input.description,
      genre: input.genre,
      release_year: input.release_year,
      director: input.director,
      poster_url: input.poster_url,
      video_url: input.video_url,
      category: input.category,
      cast: input.cast,
      average_rating: input.average_rating,
    }
  );
}
// get all movie

async function getAllMovie({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) {
  const skip = (page - 1) * limit;
  const [movies, total] = await Promise.all([
    MovieModel.find().skip(skip).limit(limit).lean(),
    MovieModel.countDocuments(),
  ]);
  return {
    movies,
    total,
  };
}

// get by id movie

async function getByIdMovie(toGetMovieId: string) {
  const movie = await MovieModel.findById(toGetMovieId);

  if (!movie) {
    throw InvalidMovieReviewPayload;
  }
  return movie;
}

// deleteMovie

async function deleteMovie(toDeleteMovieId: string) {
  const movie = await MovieModel.findById(toDeleteMovieId);
  if (!movie) {
    throw InvalidMovieReviewPayload;
  }
  await MovieModel.deleteOne({ _id: toDeleteMovieId });
  return movie;
}

export const movieMongoService = {
  createMovie,
  updateMovie,
  getByIdMovie,
  getAllMovie,
  deleteMovie,
};
