import serviceTypeModel from '../models/serviceTypeModel.js'

const getServiceTypesFromDB = async() => {
    let serviceTypes = await serviceTypeModel.find({});
    return serviceTypes;
};

const getServiceTypeByIDFromDB = async(id) => {
    let serviceType = await serviceTypeModel.findById(id);
    return serviceType;
};

const getServiceTypesByTypeFromDB = async(serviceType) => {
    const serviceTypes = await getServiceTypesFromDB();

    const filteredServiceTypes = [];

    for (const serviceTypeIndex in serviceTypes) {

        if(serviceTypes[serviceTypeIndex].serviceTypeName.toLowerCase()
                                    .includes(serviceType.toLowerCase())) {

            filteredServiceTypes.push(serviceTypes[serviceTypeIndex]);
        }
    }

    return filteredServiceTypes;
}

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

export { getServiceTypesFromDB, getServiceTypeByIDFromDB, getServiceTypesByTypeFromDB,
         addServiceType, updateServiceTypeFromDB, deleteServiceTypeFromDB };