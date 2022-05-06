import asyncHandler from 'express-async-handler';

import { getServiceTypesFromDB, getServiceTypeByIDFromDB, getServiceTypesByTypeFromDB,
         addServiceType, updateServiceTypeFromDB, deleteServiceTypeFromDB }
        from '../services/serviceTypeService.js';

import ServiceTypeHelper from '../helpers/serviceTypeHelper.js';

// Fetches all service types from DB.
const getServiceTypes = asyncHandler(async(req, res) => {
    let serviceTypes = await getServiceTypesFromDB();

    if(serviceTypes) {
        res.status(200).json(serviceTypes);
    } else {
        res.status(404);
        throw new Error('Service types not found!');
    }
});

// Fetches single service type by ID from DB.
const getServiceTypeByID = asyncHandler(async(req, res) => {
    let serviceType = await getServiceTypeByIDFromDB(req.params.id);

    if(serviceType) {
        res.status(200).json(serviceType);
    } else {
        res.status(404);
        throw new Error('Service type not found!');
    }
});

// Fetches all service types from DB, by service type.
const getServiceTypesByServiceType = asyncHandler(async(req, res) => {
    let serviceTypes = await getServiceTypesByTypeFromDB(req.params.serviceType);

    if(serviceTypes && !(Object.keys(serviceTypes).length === 0)) {
        res.status(200).json(serviceTypes);
    } else {
        res.status(404);
        throw new Error(`Service types with type ${req.params.serviceType} are not found !`);
    }
});

// Creates a new service type instance in DB.
const createServiceType = asyncHandler(async(req, res) => {
    let createdServiceTypeHelper = ServiceTypeHelper.
                                   createServiceTypeObjectHelper(req.body);

    let createdServiceType = await addServiceType(createdServiceTypeHelper);

    if(createdServiceType) {
        res.status(201).json(createdServiceType);
    } else {
        res.status(500);
        throw new Error('Service type creation failed!');
    }
});

// Updates single instance of service type by ID.
const updateServiceType = asyncHandler(async(req, res) => {
    let serviceTypeToUpdate = await getServiceTypeByIDFromDB(req.params.id);

    if(!serviceTypeToUpdate) {
        res.status(400);
        throw new Error('Service type not found!');
    }

    let updatedServiceTypeWithHelper = ServiceTypeHelper.
                                       updateServiceTypeHelper(serviceTypeToUpdate, req.body);

    let updatedServiceType = await updateServiceTypeFromDB(updatedServiceTypeWithHelper);

    if(!updatedServiceType) {
        res.status(500);
        throw new Error('Service type failed to update!');
    }

    res.status(200).json(updatedServiceType)
});

// Deletes single instance of service type from DB, by ID.
const deleteServiceType = asyncHandler(async(req, res) => {
    let serviceTypeToDelete = await getServiceTypeByIDFromDB(req.params.id);

    if(!serviceTypeToDelete) {
        res.status(400);
        throw new Error('Service type not found!');
    }

    let deletedServiceType = await deleteServiceTypeFromDB(serviceTypeToDelete);

    if(!deletedServiceType) {
        res.status(500);
        throw new Error('Service type deletion failed!');
    }

    res.status(204).json({message: 'Service type deleted successfully!'});
});

export { getServiceTypes, getServiceTypeByID, getServiceTypesByServiceType,
         createServiceType, updateServiceType, deleteServiceType };