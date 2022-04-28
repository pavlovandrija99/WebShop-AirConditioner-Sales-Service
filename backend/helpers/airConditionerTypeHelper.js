import airConditionerTypeModel from "../models/airConditionerTypeModel.js"

export default class AirConditionerTypeHelper {

    static createAirConditionerTypeObjectHelper(airConditionerTypeName) {
        return new airConditionerTypeModel({
            airConditionerType: airConditionerTypeName
        });
    };

    static updateAirConditionerTypeHelper(airConditionerTypeObj, requestBody) {
        return new airConditionerTypeModel({
            _id: airConditionerTypeObj._id,
            airConditionerType: requestBody.airConditionerType
        });
    };
}