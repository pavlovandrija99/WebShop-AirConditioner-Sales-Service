import asyncHandler from 'express-async-handler';

import { getAirConditionerTypesFromDB, getAirConditionerTypeByIDFromDB,
         addAirConditionerType, updateAirConditionerTypeFromDB,
         deleteAirConditionerTypeFromDB }
         from "../services/airConditionerTypeService.js";

import AirConditionerTypeHelper from '../helpers/airConditionerTypeHelper.js'

// Fetches all air conditioner types from DB.
const getAirConditionerTypes = asyncHandler(async (req, res) => {
    let airConditionerTypes = await getAirConditionerTypesFromDB();

    if(airConditionerTypes) {
        res.status(200).json(airConditionerTypes);
    } else {
        res.status(404);
        throw new Error('Air conditioner types not found !');
    }
});

// Fetches single air conditioner type by ID from DB.
const getAirConditionerTypeByID = asyncHandler(async(req, res) => {
    let airConditionerType = await getAirConditionerTypeByIDFromDB(req.params.id);

    if(airConditionerType) {
        res.status(200).json(airConditionerType);
    } else {
        res.status(404);
        throw new Error('Air conditioner type not found !');
    }
});

// Creates a new air conditioner type instance in DB.
const createAirConditionerType = asyncHandler(async(req, res) => {

    let createdAirConditionerTypeHelper = AirConditionerTypeHelper.createAirConditionerTypeObjectHelper(req.body.airConditionerType);

    let createdAirConditionerType = await addAirConditionerType(createdAirConditionerTypeHelper);

    if(createdAirConditionerType) {
        res.status(201).json(createdAirConditionerType);
    } else {
        res.status(500);
        throw new Error('Air conditioner type creation failed!');
    }
});


// Updates single instance of air conditioner type by ID.
const updateAirConditionerType = asyncHandler(async(req, res) => {
    let airConditionerTypeToUpdate = await getAirConditionerTypeByIDFromDB(req.params.id);

    if(!airConditionerTypeToUpdate) {
        res.status(400);
        throw new Error('Air conditioner type not found!');
    }

    let updatedAirConditionerTypeWithHelper = AirConditionerTypeHelper.updateAirConditionerTypeHelper(airConditionerTypeToUpdate, req.body);

    let updatedAirConditionerType = await updateAirConditionerTypeFromDB(updatedAirConditionerTypeWithHelper);

    if(!updatedAirConditionerType) {
        res.status(500);
        throw new Error('Air conditioner type failed to update!');
    }

    res.status(200).json(updatedAirConditionerType);
});

// Deletes single instance of air conditioner type from DB, by ID.
const deleteAirConditionerType = asyncHandler(async(req, res) => {

    let airConditionerTypeToDelete = await getAirConditionerTypeByIDFromDB(req.params.id);

    if(!airConditionerTypeToDelete) {
        res.status(400);
        throw new Error('Air conditioner type not found!');
    }

    let deletedAirConditionerType = await deleteAirConditionerTypeFromDB(airConditionerTypeToDelete);

    if(!deletedAirConditionerType) {
        res.status(500);
        throw new Error('Air conditioner type deletion failed!');
    }

    res.status(204).json({message: 'Air conditioner type deleted successfully!'});
});

export { getAirConditionerTypes, getAirConditionerTypeByID,
        createAirConditionerType, updateAirConditionerType,
        deleteAirConditionerType };

