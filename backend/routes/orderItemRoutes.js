import express from "express";

import { getOrderItems, getOrderItemByID, createOrderItem, updateOrderItem,
         deleteOrderItem }
        from "../controllers/orderItemController.js";

import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(protectRoute, getOrderItems);
router.route('/:id').get(protectRoute, getOrderItemByID);
router.route('/').post(protectRoute, createOrderItem);
router.route('/:id').put(protectRoute, updateOrderItem);
router.route('/:id').delete(protectRoute, deleteOrderItem);

export default router;