import { Request, Response, NextFunction } from "express";

function signUpController(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    // validation

    //hasing
  } catch (error) {
    console.error("Failed to signup", error);
    next(error);
  }
}
