import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
    creditCardNumber: {
        type: String,
        required: true
    },
    CCV: {
        type: String,
        required: true
    },
    paymentDateAndTime: {
        type: Date,
        required: true
    }
}, { timestamps: true});

const paymentModel = mongoose.model('paymentModel', paymentSchema, "Payment");

export default paymentModel;