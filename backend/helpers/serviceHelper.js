import serviceModel from "../models/serviceModel.js";
import mongoose from "mongoose";

export default class ServiceHelper {

    static createServiceObjectHelper(requestBody) {

        return new serviceModel({
            serviceType: mongoose.Types.ObjectId(requestBody.serviceType),
            airConditioner: mongoose.Types.ObjectId(requestBody.airConditioner),
            users: requestBody.users
        });
    }

    static updateServiceHelper(serviceToUpdate, requestBody) {

        return new serviceModel({
            _id: serviceToUpdate._id,
            serviceType: mongoose.Types.ObjectId(requestBody.serviceType),
            airConditioner: mongoose.Types.ObjectId(requestBody.airConditioner),
            users: requestBody.users
        });
    }
}