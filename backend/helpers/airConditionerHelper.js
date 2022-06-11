import airConditionerModel from "../models/airConditionerModel.js";
import mongoose from "mongoose";

export default class AirConditionerHelper {

    static createAirConditionerObjectHelper (requestBody) {
        return new airConditionerModel({
            airConditionerType: mongoose.Types.ObjectId(requestBody.airConditionerType),
            airConditionerModel: requestBody.airConditionerModel,
            powerConsumption: requestBody.powerConsumption,
            operatingTemperatureRange: requestBody.operatingTemperatureRange,
            outdoorUnitDimension: requestBody.outdoorUnitDimension,
            indoorUnitDimension: requestBody.indoorUnitDimension,
            coolingCapacity: requestBody.coolingCapacity,
            heatingCapacity: requestBody.heatingCapacity,
            energyClass: requestBody.energyClass,
            airConditionerDescription: requestBody.airConditionerDescription,
            airConditionerPrice: requestBody.airConditionerPrice,
            stock: requestBody.stock,
            image: requestBody.image,
            numReviews: requestBody.numReviews,
            rating: requestBody.rating
        });
    };

    static updateAirConditionerHelper(airConditionerObj, requestBody) {
        return new airConditionerModel({
            _id: airConditionerObj._id,
            airConditionerType: requestBody.airConditionerType,
            airConditionerModel: requestBody.airConditionerModel,
            powerConsumption: requestBody.powerConsumption,
            operatingTemperatureRange: requestBody.operatingTemperatureRange,
            outdoorUnitDimension: requestBody.outdoorUnitDimension,
            indoorUnitDimension: requestBody.indoorUnitDimension,
            coolingCapacity: requestBody.coolingCapacity,
            heatingCapacity:  requestBody.heatingCapacity,
            energyClass: requestBody.energyClass,
            airConditionerDescription: requestBody.airConditionerDescription,
            airConditionerPrice: requestBody.airConditionerPrice,
            stock: requestBody.stock,
            image: requestBody.image,
            numReviews: requestBody.numReviews,
            rating: requestBody.rating
        });
    };
}