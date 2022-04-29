import serviceTypeModel from "../models/serviceTypeModel.js";

export default class ServiceTypeHelper {

    static createServiceTypeObjectHelper(requestBody) {
        return new serviceTypeModel({
            serviceTypeName: requestBody.serviceTypeName
        });
    }

    static updateServiceTypeHelper(serviceTypeToUpdate, requestBody) {
        return new serviceTypeModel({
            _id: serviceTypeToUpdate._id,
            serviceTypeName: requestBody.serviceTypeName
        });
    }
}