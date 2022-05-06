import paymentModel from '../models/paymentModel.js';

const getPaymentsFromDB = async() => {
    const payments = await paymentModel.find({});
    return payments;
};

const getPaymentByIDFromDB = async(id) => {
    const payment = await paymentModel.findById(id);
    return payment;
};

const getPaymentsByCreditCardNumberFromDB = async(creditCardNumber) => {
    const payments = await getPaymentsFromDB();

    const filteredPayments = [];

    for (const paymentIndex in payments) {

        if(payments[paymentIndex].creditCardNumber.toLowerCase()
                                    .includes(creditCardNumber.toLowerCase())) {

            filteredPayments.push(payments[paymentIndex]);
        }
    }

    return filteredPayments;
};

const getPaymentsByDateTimeFromDB = async(paymentDateTime) => {
    const payments = await getPaymentsFromDB();

    const filteredPayments = [];

    for (const paymentIndex in payments) {
        console.log(payments[paymentIndex].paymentDateAndTime.toString());
        if(payments[paymentIndex].paymentDateAndTime.toString().toLowerCase()
                                    .includes(paymentDateTime.toLowerCase())) {

            filteredPayments.push(payments[paymentIndex]);
        }
    }

    return filteredPayments;
}

const addPayment = async(paymentToAdd) => {
    const addedPayment = await paymentToAdd.save();
    return addedPayment;
};

const updatePaymentFromDB = async(paymentToUpdate) => {
    let updatedPayment = await paymentModel.findOneAndUpdate(
                         { _id: paymentToUpdate._id},
                         { creditCardNumber: paymentToUpdate.creditCardNumber,
                           CCV: paymentToUpdate.CCV,
                           paymentDateAndTime: paymentToUpdate.paymentDateAndTime
                        },
                        { new:true });

    return updatedPayment;
};

const deletePaymentByIDFromDB = async(paymentToDelete) => {
    let deletedPayment = paymentModel.deleteOne({_id: paymentToDelete._id});
    return deletedPayment;
};

export { getPaymentsFromDB, getPaymentByIDFromDB, getPaymentsByCreditCardNumberFromDB,
         getPaymentsByDateTimeFromDB, addPayment, updatePaymentFromDB,
         deletePaymentByIDFromDB };