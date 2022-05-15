import express from "express";

import { getPayments, getPaymentByID, getPaymentsByCreditCardNumber,
         getPaymentsByDateTime, createPayment, updatePayment, deletePayment }
         from "../controllers/paymentController.js";

import { protectRoute } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(protectRoute, getPayments);
router.route('/:id').get(protectRoute, getPaymentByID);
router.route('/creditCardNumber/:creditCardNumber').get(protectRoute, getPaymentsByCreditCardNumber);
router.route('/paymentDateTime/:paymentDateTime').get(protectRoute, getPaymentsByDateTime);
router.route('/').post(protectRoute, createPayment);
router.route('/:id').put(protectRoute ,updatePayment);
router.route('/:id').delete(protectRoute, deletePayment);

export default router;