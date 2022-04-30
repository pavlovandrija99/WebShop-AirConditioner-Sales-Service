import express from "express";

import { getOrders, getOrderByID, createOrder, updateOrder, deleteOrder }
        from "../controllers/orderController.js";

const router = express.Router();

router.route('/').get(getOrders);
router.route('/:id').get(getOrderByID);
router.route('/').post(createOrder);
router.route('/:id').put(updateOrder);
router.route('/:id').delete(deleteOrder);

export default router;