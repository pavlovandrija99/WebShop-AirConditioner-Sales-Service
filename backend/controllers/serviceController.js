import asyncHandler from 'express-async-handler';

import { getServicesFromDB, getServiceByIDFromDB, addService,
         updateServiceFromDB ,deleteServiceFromDB }
         from '../services/serviceService.js';

import ServiceHelper from '../helpers/serviceHelper.js';

// Fetches all services from DB.
const getServices = asyncHandler(async(req, res) => {
    let services = await getServicesFromDB();

    if(services) {
        res.status(200).json(services);
    } else {
        res.status(404);
        throw new Error('Services not found!');
    }
});

// Fetches single service by ID from DB.
const getServiceByID = asyncHandler(async(req, res) => {
    let service = await getServiceByIDFromDB(req.params.id);

    if(service) {
        res.status(200).json(service);
    } else {
        res.status(404);
        throw new Error('Service not found!');
    }
});

// Creates a new service instance in DB.
const createService = asyncHandler(async(req, res) => {
    let createServiceHelper = ServiceHelper.createServiceObjectHelper(req.body);

    let createdService = await addService(createServiceHelper);

    if(createdService) {
        res.status(201).json(createdService);
    } else {
        res.status(500);
        throw new Error('Service creation failed!');
    }
});

// Updates single instance of service by ID.
const updateService = asyncHandler(async(req, res) => {
    let serviceToUpdate = await getServiceByIDFromDB(req.params.id);

    if(!serviceToUpdate) {
        res.status(400);
        throw new Error('Service not found!');
    }

    let updatedServiceWithHelper =  ServiceHelper.updateServiceHelper(serviceToUpdate, req.body);

    let updatedService = await updateServiceFromDB(updatedServiceWithHelper);

    if(!updatedService) {
        res.status(500);
        throw new Error('Service failed to update!');
    }

    res.status(200).json(updatedService);
});

// Deletes single instance of service from DB, by ID.
const deleteService = asyncHandler(async(req, res) => {
    let serviceToDelete = await getServiceByIDFromDB(req.params.id);

    if(!serviceToDelete) {
        res.status(400);
        throw new Error('Service not found!');
    }

    let deletedService = await deleteServiceFromDB(serviceToDelete);

    if(!deletedService) {
        res.status(500);
        throw new Error('Service deletion failed!');
    }

    res.status(204).json({message: 'Service deleted successfully!'});
});

export { getServices, getServiceByID, createService, updateService, deleteService };