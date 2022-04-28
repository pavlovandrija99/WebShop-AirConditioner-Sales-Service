import express from "express";

import { getPayments, getPaymentByID, createPayment, updatePayment,
         deletePayment } from "../controllers/paymentController.js";

const router = express.Router();

router.route('/').get(getPayments);
router.route('/:id').get(getPaymentByID);
router.route('/').post(createPayment);
router.route('/:id').put(updatePayment);
router.route('/:id').delete(deletePayment);

export default router;