import express from "express";

import { getOrders, getOrderByID, createOrder, updateOrder, deleteOrder }
        from "../controllers/orderController.js";

import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(protectRoute, getOrders);
router.route('/:id').get(protectRoute, getOrderByID);
router.route('/').post(protectRoute, createOrder);
router.route('/:id').put(protectRoute, updateOrder);
router.route('/:id').delete(protectRoute, deleteOrder);

export default router;