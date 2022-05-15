import serviceModel from '../models/serviceModel.js'

const getServicesFromDB = async() => {
    let services = await serviceModel.find({});
    return services;
}

const getServiceByIDFromDB = async(id) => {
    let service = await serviceModel.findById(id);
    return service;
}

const addService = async(serviceToAdd) => {
    let addedService = await serviceToAdd.save();
    return addedService;
}

const updateServiceFromDB = async(serviceToUpdate) => {
    let updatedService = await serviceModel.findOneAndUpdate({_id: serviceToUpdate._id},
                                            { serviceType: serviceToUpdate.serviceType,
                                              airConditioner: serviceToUpdate.airConditioner,
                                              users: serviceToUpdate.users },
                                              { new:true });

    return updatedService;
}

const deleteServiceFromDB = async(serviceToDelete) => {
    return await serviceToDelete.remove();
}

export { getServicesFromDB, getServiceByIDFromDB, addService, updateServiceFromDB,
         deleteServiceFromDB };