import mongoose from "mongoose";
import orderModel from './orderModel.js';

const orderItemSchema = mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'serviceModel'
    },
    itemQuantity: {
        type: Number,
        required: true
    },
    itemPrice: {
        type: String
    }
}, { timestamps: true });

orderItemSchema.pre('remove', async function(next) {
    const orders = await orderModel.find({});

    for(const orderIndex in orders) {
        for(const orderItemIndex in orders[orderIndex].orderItems) {
            if(orders[orderIndex].orderItems[orderItemIndex].orderItemID.valueOf() === this._id.valueOf()) {
                let orderToDelete = await orderModel.findById(orders[orderIndex]._id.valueOf());
                await orderToDelete.remove();
            }
        }
    }
    next();
});

const orderItemModel = mongoose.model('orderItemModel', orderItemSchema, "OrderItem");

export default orderItemModel;