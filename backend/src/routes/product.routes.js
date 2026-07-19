import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import protect from "../middlewares/auth.middleware.js"


const router = express.Router();

// Public
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

// Protected
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;