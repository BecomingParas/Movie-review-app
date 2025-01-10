import { MovieReviewAppError } from "../error";

export class MovieNotReviewFound extends MovieReviewAppError {
  constructor() {
    super("Movie not found", 404);
    Error.captureStackTrace(this);
  }
}

export class InvalidMovieReviewPayload extends MovieReviewAppError {
  constructor(meta: any) {
    super("Invalid payload", 400, meta);
    Error.captureStackTrace(this);
  }
}
