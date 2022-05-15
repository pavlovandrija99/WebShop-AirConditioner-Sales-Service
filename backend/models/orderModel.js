import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'userModel'
    },
    orderItems: [
        {
            _id: false,
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
    },
    orderPrice: {
        type: String
    },
    orderAddress: {
        type: String,
        required: true
    }
}, { timestamps: true });

orderSchema.pre('remove', async function(next) {
    await this.model('paymentModel').deleteOne({_id: this.payment});
    next();
});

const orderModel = mongoose.model('orderModel', orderSchema, "Order");

export default orderModel;