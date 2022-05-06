import orderModel from "../models/orderModel.js";
import mongoose from "mongoose";
import { getOrderItemByIDFromDB } from "../services/orderItemService.js";

export default class OrderHelper {

    static async createOrderObjectHelper(requestBody) {

        let totalOrderPrice = 0;
        let orderItem;

        for(const orderItemID in requestBody.orderItems) {
            orderItem = await getOrderItemByIDFromDB(requestBody.orderItems[orderItemID].orderItemID);
            totalOrderPrice += parseInt(orderItem.itemPrice.substring(0, orderItem.itemPrice.indexOf("€"))) * orderItem.itemQuantity;
        }

        return new orderModel({
            user: mongoose.Types.ObjectId(requestBody.user),
            orderItems: requestBody.orderItems,
            payment: mongoose.Types.ObjectId(requestBody.payment),
            orderDateAndTime: new Date(),
            orderPrice: `${totalOrderPrice}€`,
            orderAddress: requestBody.orderAddress
        });
    }

    static updateOrderHelper(orderToUpdate, requestBody) {
        return new orderModel({
            _id: orderToUpdate._id,
            user: mongoose.Types.ObjectId(requestBody.user),
            orderItems: requestBody.orderItems,
            payment: mongoose.Types.ObjectId(requestBody.payment),
            orderDateAndTime: new Date(),
            orderPrice: requestBody.orderPrice,
            orderAddress: requestBody.orderAddress
        });
    }
}