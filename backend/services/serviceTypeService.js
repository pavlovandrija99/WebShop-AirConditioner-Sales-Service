import serviceTypeModel from '../models/serviceTypeModel.js'

const getServiceTypesFromDB = async() => {
    let serviceTypes = await serviceTypeModel.find({});
    return serviceTypes;
};

const getServiceTypeByIDFromDB = async(id) => {
    let serviceType = await serviceTypeModel.findById(id);
    return serviceType;
};

const addServiceType = async(serviceTypeToAdd) => {
    let addedServiceType = await serviceTypeToAdd.save();
    return addedServiceType;
}

const updateServiceTypeFromDB = async(serviceTypeToUpdate) => {
    let updatedServiceType = await serviceTypeModel.findOneAndUpdate(
                                {_id: serviceTypeToUpdate._id},
                                {serviceTypeName: serviceTypeToUpdate.serviceTypeName},
                                {new: true}
                            );

    return updatedServiceType;
}

const deleteServiceTypeFromDB = async(serviceTypeToDelete) => {
    let deletedServiceType = await serviceTypeModel.deleteOne({_id: serviceTypeToDelete._id});
    return deletedServiceType;
}

export { getServiceTypesFromDB, getServiceTypeByIDFromDB, addServiceType,
         updateServiceTypeFromDB, deleteServiceTypeFromDB };