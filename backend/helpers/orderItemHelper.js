import orderItemModel from "../models/orderItemModel.js";
import mongoose from "mongoose";
import { getServiceByIDFromDB } from '../services/serviceService.js';
import { getAirConditionerByIDFromDB } from '../services/airConditionerService.js';


export default class OrderItemHelper {

    static async createOrderItemObjectHelper(requestBody) {

        let service = await getServiceByIDFromDB(mongoose.Types.ObjectId(requestBody.service));
        let airConditioner = await getAirConditionerByIDFromDB(service.airConditioner);

        return new orderItemModel({
            service: mongoose.Types.ObjectId(requestBody.service),
            itemQuantity: requestBody.itemQuantity,
            itemPrice: airConditioner.airConditionerPrice
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