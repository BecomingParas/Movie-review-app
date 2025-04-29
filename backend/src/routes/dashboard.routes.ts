import { Express } from "express";
import { getDashboard } from "../controllers/Dashboard.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";
export function Dashboard(app: Express) {
  app.get("/api/dashboard", authMiddleware, getDashboard);
}
