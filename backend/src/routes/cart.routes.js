import express from "express";
import protect from "../middlewares/auth.middleware.js";

import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeCartItem,
  clearCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.put("/:productId", protect, updateCartQuantity);
router.delete("/:productId", protect, removeCartItem);
router.delete("/", protect, clearCart);

export default router;