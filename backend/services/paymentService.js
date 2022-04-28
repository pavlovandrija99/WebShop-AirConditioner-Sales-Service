import paymentModel from '../models/paymentModel.js';

const getPaymentsFromDB = async() => {
    const payments = await paymentModel.find({});
    return payments;
};

const getPaymentByIDFromDB = async(id) => {
    const payment = await paymentModel.findById(id);
    return payment;
};

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

export { getPaymentsFromDB, getPaymentByIDFromDB, addPayment, updatePaymentFromDB,
         deletePaymentByIDFromDB };