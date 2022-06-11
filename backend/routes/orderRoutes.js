import express from "express";

import {
  getOrders,
  getOrderByID,
  createOrder,
  updateOrder,
  updateOrderToDelivered,
  deleteOrder,
  updateOrderToPaid,
  getMyOrders
} from "../controllers/orderController.js";

import { protectRoute, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protectRoute, getOrders);
router.route("/myorders").get(protectRoute, getMyOrders);
router.route("/:id").get(protectRoute, getOrderByID);
router.route("/").post(protectRoute, createOrder);
router.route("/:id/pay").put(protectRoute, updateOrderToPaid);
router.route("/:id").put(protectRoute, updateOrder);
router.route("/:id").delete(protectRoute, deleteOrder);
router.route("/:id/deliver").put(protectRoute, admin, updateOrderToDelivered);

export default router;
