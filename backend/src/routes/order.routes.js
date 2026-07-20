import express from "express";
import protect from "../middlewares/auth.middleware.js";

import {
  placeOrder,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus,
  getAllOrders,
} from "../controllers/order.controller.js";
import admin from "../middlewares/admin.middleware.js"

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getSingleOrder);
router.put("/:id", protect,  admin, updateOrderStatus);
router.get("/", protect, admin, getAllOrders);

export default router;