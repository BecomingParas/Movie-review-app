import { InvalidMovieReviewPayload } from "../utils/movie-review-errors";

import { TMovies } from "../types/movie.type";
import { MovieModel } from "../model/movie.model";
//create movie

async function createMovie(input: Omit<TMovies, "id">) {
  const movie = new MovieModel({
    title: input.title,
    description: input.description,
    genre: input.genre,
    director: input.director,
    release_year: input.release_year,
    duration: input.duration,
    average_rating: input.average_rating,
    cast: input.cast,
    poster_url: input.poster_url,
    video_url: input.video_url,
    category: input.category,
    created_by_id: input.created_by_id,
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
      duration: input.duration,
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

async function getAllMovie() {
  try {
    const movies = await MovieModel.find().lean();
    return movies;
  } catch (error: any) {
    throw new Error(`Failed to fetch movies: ${error.message}`);
  }
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
    throw new InvalidMovieReviewPayload("Movie not found");
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
