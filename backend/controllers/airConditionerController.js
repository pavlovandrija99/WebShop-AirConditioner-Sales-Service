import asyncHandler from 'express-async-handler';
import airConditionerHelper from '../helpers/airConditionerHelper.js';

import { getAirConditionersFromDB, getAirConditionerByIDFromDB,
         addAirConditioner, updateAirConditionerFromDB,
         deleteAirConditionerTypeFromDB }
         from '../services/airConditionerService.js';

// Fetches all air conditioners from DB.
const getAirConditioners = asyncHandler(async(req, res) => {
    let airConditioners = await getAirConditionersFromDB();

    if(airConditioners) {
        res.status(200).json(airConditioners);
    } else {
        res.status(404);
        throw new Error('Air conditiones not found !');
    }
});

// Fetches single air conditioner from DB, by ID.
const getAirConditionerByID = asyncHandler(async(req, res) => {
    let airConditioner = await getAirConditionerByIDFromDB(req.params.id);

    if(airConditioner) {
        res.status(200).json(airConditioner);
    } else {
        res.status(404);
        throw new Error('Air conditioner type not found !');
    }
});

// Creates a new air conditioner instance in DB.
const createAirConditioner = asyncHandler(async(req, res) => {
    let createdAirConditionerHelper = airConditionerHelper.createAirConditionerObjectHelper(req.body);

    let createdAirConditioner = await addAirConditioner(createdAirConditionerHelper);

    if(createdAirConditioner) {
        res.status(201).json(createdAirConditioner);
    } else {
        res.status(500);
        throw new Error('Air conditioner creation failed!');
    }
});

// Updates single instance of air conditioner by ID.
const updateAirConditioner = asyncHandler(async(req, res) =>{
    let airConditionerToUpdate = await getAirConditionerByIDFromDB(req.params.id);

    if(!airConditionerToUpdate) {
        res.status(400);
        throw new Error('Air conditioner type not found!');
    }

    let updatedAirConditionerWithHelper = airConditionerHelper.updateAirConditionerHelper(airConditionerToUpdate, req.body);

    let updatedAirConditioner = await updateAirConditionerFromDB(updatedAirConditionerWithHelper);

    if(!updatedAirConditioner) {
        res.status(500);
        throw new Error('Air conditioner type failed to update!');
    }

    res.status(200).json(updatedAirConditioner);
});

// Deletes single instance of air conditioner from DB, by ID.
const deleteAirConditioner = asyncHandler(async(req, res) => {
    let airConditionerToDelete = await getAirConditionerByIDFromDB(req.params.id);

    if(!airConditionerToDelete) {
        res.status(400);
        throw new Error('Air conditioner not found!');
    }

    let deletedAirConditioner = await deleteAirConditionerTypeFromDB(airConditionerToDelete);

    if(!deletedAirConditioner) {
        res.status(500);
        throw new Error('Air conditioner type deletion failed!');
    }

    res.status(204).json({message: 'Air conditioner deleted successfully!'});
});

export { getAirConditioners,  getAirConditionerByID, createAirConditioner,
         updateAirConditioner, deleteAirConditioner };

/*
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
*/