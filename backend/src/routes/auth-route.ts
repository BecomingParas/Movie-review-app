import { loginController } from "../controllers/auth-controller/login-controller";
import { logoutController } from "../controllers/auth-controller/logout-controller";
import { signUpController } from "../controllers/auth-controller/signup-controller";
import { meController } from "../controllers/auth-controller/me-controller";
import { Express } from "express";
import { authMiddlare } from "../utils/auth-middleware";

export function createAuthRoutes(app: Express) {
  // mutation
  app.post("/api/auth/signup", signUpController);
  app.post("/api/auth/login", loginController);
  app.post("/api/auth/logout", authMiddlare, logoutController);

  // query
  app.get("/api/auth/me", authMiddlare, meController);
}
