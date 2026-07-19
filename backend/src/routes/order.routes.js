import express from "express";
import protect from "../middlewares/auth.middleware.js";

import {
  placeOrder,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getSingleOrder);
router.put("/:id", protect, updateOrderStatus);

export default router;