import paymentModel from "../models/paymentModel.js";

export default class PaymentHelper {

    static createPaymentObjectHelper(requestBody) {
        return new paymentModel({
            creditCardNumber: requestBody.creditCardNumber,
            CCV: requestBody.CCV,
            paymentDateAndTime: new Date()
        });
    };

    static updatePaymentHelper(paymentToUpdate, requestBody) {
        return new paymentModel({
            _id: paymentToUpdate._id,
            creditCardNumber: requestBody.creditCardNumber,
            CCV: requestBody.CCV,
            paymentDateAndTime: new Date()
        });
    };
}