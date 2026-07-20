import express from "express";
import protect from "../middlewares/auth.middleware.js";
import admin from "../middlewares/admin.middleware.js";
import { getDashboardStats } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", protect, admin, getDashboardStats);

export default router;