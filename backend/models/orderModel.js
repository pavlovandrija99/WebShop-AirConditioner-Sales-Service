import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'userModel'
    },
    orderItems: [
        {
            orderItemID: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'orderItemModel'
            }
        }
    ],
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'paymentModel'
    },
    orderDateAndTime: {
        type: Date,
        required: true
    },
    orderPrice: {
        type: Number,
        required: true
    },
    orderAddress: {
        type: String,
        required: true
    }
}, { timestamps: true });

const orderModel = mongoose.model('orderModel', orderSchema);

export default orderModel;