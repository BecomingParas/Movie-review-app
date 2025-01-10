type TMovie = {
  id: number;
  title: string;
  description: string;
  release_year: number;
  genre: string;
};

let movies: TMovie[] = [];

// creating the movie

function createMovie(input: Omit<TMovie, "id">) {
  movies.push({
    id: movies.length + 1,
    title: input.title,
    description: input.description,
    release_year: input.release_year,
    genre: input.genre,
  });
}

// get all the movie

function getAllMovie() {
  return movies;
}
// get by id movie
function getByIdMovie(movieId: number) {
  const movie = movies.find((movie) => {
    if (movie.id === movieId) {
      return true;
    } else {
      return false;
    }
  });
  return movie;
}

// update the movie

function updateMovie(toUpdateMovieId: number, input: Omit<TMovie, "id">) {
  const updatedMovies = movies.map((movie) => {
    if (movie.id === toUpdateMovieId) {
      return {
        id: movie.id,
        title: input.title,
        description: input.description,
        release_year: input.release_year,
        genre: input.genre,
      };
    } else {
      return movie;
    }
  });
  movies = updatedMovies;
}

// delete the movie

function deleteMovie(toDeleteMovieId: number) {
  const movieAfterDeleation = movies.filter((movie) => {
    if (movie.id === toDeleteMovieId) {
      return false;
    } else {
      return true;
    }
  });
  movies = movieAfterDeleation;
}

export const movieService = {
  createMovie,
  getAllMovie,
  updateMovie,
  getByIdMovie,
  deleteMovie,
};
