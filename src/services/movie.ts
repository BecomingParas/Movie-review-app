import { conn } from "../db";
import { connPromise } from "./db-promise";
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
  // movies.push({
  //   id: movies.length + 1,
  //   title: input.title,
  //   description: input.description,
  //   release_year: input.release_year,
  //   genre: input.genre,
  // });

  // db connection
  // insert into
  conn.query(
    `
  INSERT INTO movies
  (title,description,release_year,genre)
  VALUES
  ("${input.title}","${input.description}",${input.release_year},"${input.genre}");
  `,
    (err, result) => {
      if (err) {
        console.error("Error creating movies in db", err);
      } else {
        console.log("movie created in db", result);
      }
    }
  );
}

// get all the movie

async function getAllMovie() {
  const conn = await connPromise;
  const [rows] = await conn.execute(
    `
    SELECT * FROM movies

    
    `
  );

  return rows;
}
// get by id movie
async function getByIdMovie(movieId: number) {
  // const movie = movies.find((movie) => {
  //   if (movie.id === movieId) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });
  // return movie;
  const conn = await connPromise;
  const [rows] = await conn.execute(
    `
    SELECT * FROM movies
    WHERE id = ${movieId}
    `
  );
  //@ts-ignore
  return rows[0];
}

// update the movie

function updateMovie(toUpdateMovieId: number, input: Omit<TMovie, "id">) {
  // const updatedMovies = movies.map((movie) => {
  //   if (movie.id === toUpdateMovieId) {
  //     return {
  //       id: movie.id,
  //       title: input.title,
  //       description: input.description,
  //       release_year: input.release_year,
  //       genre: input.genre,
  //     };
  //   } else {
  //     return movie;
  //   }
  // });
  // movies = updatedMovies;

  conn.query(
    `
  UPDATE movies SET 
  title = "${input.title}",
  description = "${input.description}",
  release_year = ${input.release_year},
  genre = "${input.genre}"
  WHERE
  id = ${toUpdateMovieId};
  `,
    (err, result) => {
      if (err) {
        console.error("Failed to update", err);
      } else {
        console.log("Updated", result);
      }
    }
  );
}

// delete the movie

function deleteMovie(toDeleteMovieId: number) {
  // const movieAfterDeleation = movies.filter((movie) => {
  //   if (movie.id === toDeleteMovieId) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // });
  // movies = movieAfterDeleation;

  conn.query(
    `
    DELETE FROM movies
    WHERE
    id = ${toDeleteMovieId};
    `,
    (err, result) => {
      if (err) {
        console.error("Failed to delete", err);
      } else {
        console.log("deleted", result);
      }
    }
  );
}

export const movieService = {
  createMovie,
  getAllMovie,
  updateMovie,
  getByIdMovie,
  deleteMovie,
};
