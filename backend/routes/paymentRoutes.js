import express from "express";

import { getPayments, getPaymentByID, getPaymentsByCreditCardNumber,
         getPaymentsByDateTime, createPayment, updatePayment, deletePayment }
         from "../controllers/paymentController.js";

const router = express.Router();

router.route('/').get(getPayments);
router.route('/:id').get(getPaymentByID);
router.route('/creditCardNumber/:creditCardNumber').get(getPaymentsByCreditCardNumber);
router.route('/paymentDateTime/:paymentDateTime').get(getPaymentsByDateTime);
router.route('/').post(createPayment);
router.route('/:id').put(updatePayment);
router.route('/:id').delete(deletePayment);

export default router;