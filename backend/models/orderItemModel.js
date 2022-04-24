import mongoose from "mongoose";

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
        type: String,
        required: true
    }
}, { timestamps: true });

const orderItemModel = mongoose.model('orderItemModel', orderItemSchema);

export default orderItemModel;