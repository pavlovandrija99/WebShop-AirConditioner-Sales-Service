import asyncHandler from 'express-async-handler';

import { getPaymentsFromDB, getPaymentByIDFromDB, getPaymentsByCreditCardNumberFromDB,
         getPaymentsByDateTimeFromDB,addPayment, updatePaymentFromDB,
         deletePaymentByIDFromDB } from '../services/paymentService.js';

import PaymentHelper from '../helpers/paymentHelper.js';

// Fetches all payments from DB.
const getPayments = asyncHandler(async(req, res) =>{
    let payments = await getPaymentsFromDB();

    if(payments) {
        res.status(200).json(payments);
    } else {
        res.status(404);
        throw new Error('Payments not found!');
    }
});

// Fetches single payment by ID from DB.
const getPaymentByID = asyncHandler(async(req, res) => {
    let payment = await getPaymentByIDFromDB(req.params.id);

    if(payment) {
        res.status(200).json(payment);
    } else {
        res.status(404);
        throw new Error('Payment not found!');
    }
});

// Fetches all payments from DB, by given credit card number.
const getPaymentsByCreditCardNumber = asyncHandler(async(req, res) => {
    let payments = await getPaymentsByCreditCardNumberFromDB(req.params.creditCardNumber);

    if(payments && !(Object.keys(payments).length === 0)) {
        res.status(200).json(payments);
    } else {
        res.status(404);
        throw new Error(`Payments with credit card number ${req.params.creditCardNumber} are not found !`);
    }
});

// Fetches all payments from DB, by given payment date-time.
const getPaymentsByDateTime = asyncHandler(async(req, res) => {
    let payments = await getPaymentsByDateTimeFromDB(req.params.paymentDateTime);

    if(payments && !(Object.keys(payments).length === 0)) {
        res.status(200).json(payments);
    } else {
        res.status(404);
        throw new Error(`Payments with date-time ${req.params.paymentDateTime} are not found !`);
    }
});

// Creates a new payment instance in DB.
const createPayment = asyncHandler(async(req, res) => {
    let createdPaymentHelper = PaymentHelper.createPaymentObjectHelper(req.body);

    let createdPayment = await addPayment(createdPaymentHelper);

    if(createdPayment) {
        res.status(201).json(createdPayment);
    } else {
        res.status(500);
        throw new Error('Payment creation failed!');
    }
});

// Updates single instance of payment by ID.
const updatePayment = asyncHandler(async(req, res) => {
    let paymentToUpdate = await getPaymentByIDFromDB(req.params.id);

    if(!paymentToUpdate) {
        res.status(400);
        throw new Error('Payment not found!');
    }

    let updatedPaymentWithHelper = PaymentHelper.updatePaymentHelper(paymentToUpdate, req.body);

    let updatedPayment = await updatePaymentFromDB(updatedPaymentWithHelper);

    if(!updatedPayment) {
        res.status(500);
        throw new Error('Payment failed to update!');
    }

    res.status(200).json(updatedPayment);
});

// Deletes single instance of payment from DB, by ID.
const deletePayment = asyncHandler(async(req, res) => {
    let paymentToDelete = await getPaymentByIDFromDB(req.params.id);

    if(!paymentToDelete) {
        res.status(400);
        throw new Error('Payment not found!');
    }

    let deletedPayment = await deletePaymentByIDFromDB(paymentToDelete);

    if(!deletedPayment) {
        res.status(500);
        throw new Error('Payment deletion failed!');
    }

    res.status(204).json({message: 'Payment deleted successfully!'});
});

export { getPayments, getPaymentByID, getPaymentsByCreditCardNumber,
         getPaymentsByDateTime, createPayment, updatePayment, deletePayment };