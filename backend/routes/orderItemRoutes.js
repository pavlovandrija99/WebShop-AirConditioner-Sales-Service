import express from "express";

import { getOrderItems, getOrderItemByID, createOrderItem, updateOrderItem,
         deleteOrderItem }
        from "../controllers/orderItemController.js";

const router = express.Router();

router.route('/').get(getOrderItems);
router.route('/:id').get(getOrderItemByID);
router.route('/').post(createOrderItem);
router.route('/:id').put(updateOrderItem);
router.route('/:id').delete(deleteOrderItem);

export default router;