import orderModel from "../models/orderModel.js";
import mongoose from "mongoose";

export default class OrderHelper {

    static async createOrderObjectHelper(req) {

        return new orderModel({
            user: mongoose.Types.ObjectId(req.user._id),
            orderItems: req.body.orderItems,
            orderDateAndTime: new Date(),
            orderPrice: `${req.body.totalPrice}€`,
            orderAddress: req.body.shippingAddress.address,
            orderCity: req.body.shippingAddress.city,
            orderPostalCode: req.body.shippingAddress.postalCode,
            orderCountry: req.body.shippingAddress.country,
            orderPaymentMethod: req.body.paymentMethod,
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