import { TPayload } from "./types/payload.type";
declare global {
  declare namespace Express {
    export interface Request {
      user?: TPayload;
    }
  }
}
