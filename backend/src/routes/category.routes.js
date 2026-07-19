import express from "express";
import {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getSingleCategory);

router.post("/", protect, createCategory);
router.put("/:id", protect, updateCategory);
router.delete("/:id", protect, deleteCategory);

export default router;