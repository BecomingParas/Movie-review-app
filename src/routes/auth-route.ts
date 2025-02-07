import { loginController } from "../controllers/auth-controller/login-controller";
import { signUpController } from "../controllers/auth-controller/signup-controller";
import { Express } from "express";
export function createAuthRoutes(app: Express) {
  // mutation
  app.post("/auth/signup", signUpController);
  app.post("/auth/login", loginController);
}
