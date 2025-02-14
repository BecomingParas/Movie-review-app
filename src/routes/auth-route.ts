import { loginController } from "../controllers/auth-controller/login-controller";
import { logoutController } from "../controllers/auth-controller/logout-controller";
import { signUpController } from "../controllers/auth-controller/signup-controller";
import { Express } from "express";
import { authMiddlare } from "../utils/auth-middleware";
export function createAuthRoutes(app: Express) {
  // mutation
  app.post("/auth/signup", signUpController);
  app.post("/auth/login", loginController);
  app.post("/auth/logout", authMiddlare, logoutController);
}
