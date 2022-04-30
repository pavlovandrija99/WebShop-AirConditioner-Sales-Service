import orderModel from "../models/orderModel.js";
import mongoose from "mongoose";
import { request } from "express";

export default class OrderHelper {

    static createOrderObjectHelper(requestBody) {
        return new orderModel({
            user: mongoose.Types.ObjectId(requestBody.user),
            orderItems: requestBody.orderItems,
            payment: mongoose.Types.ObjectId(requestBody.payment),
            orderDateAndTime: new Date(),
            orderPrice: request.orderPrice,
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