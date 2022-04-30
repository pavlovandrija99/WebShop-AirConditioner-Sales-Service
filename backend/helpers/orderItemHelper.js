import orderItemModel from "../models/orderItemModel.js";
import mongoose from "mongoose";

export default class OrderItemHelper {

    static createOrderItemObjectHelper(requestBody) {
        return new orderItemModel({
            service: mongoose.Types.ObjectId(requestBody.service),
            itemQuantity: requestBody.itemQuantity,
            itemPrice: requestBody.itemPrice
        });
    }

    static updateOrderItemHelper(orderItemToUpdate, requestBody) {
        return new orderItemModel({
            _id: orderItemToUpdate._id,
            service: mongoose.Types.ObjectId(requestBody.service),
            itemQuantity: requestBody.itemQuantity,
            itemPrice: requestBody.itemPrice
        });
    }
}