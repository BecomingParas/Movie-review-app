import { MovieAppError } from "../error";

export class MovieNotFound extends MovieAppError {
  constructor() {
    super("Movie not found", 404);
    Error.captureStackTrace(this);
  }
}

export class InvalidMoviePayload extends MovieAppError {
  constructor(meta: any) {
    super("Invalid payload", 400, meta);
    Error.captureStackTrace(this);
  }
}
