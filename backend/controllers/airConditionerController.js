import asyncHandler from "express-async-handler";
import AirConditionerHelper from "../helpers/airConditionerHelper.js";

import {
  getAirConditionersFromDB,
  getAirConditionerByIDFromDB,
  getAirConditionersByModelFromDB,
  addAirConditioner,
  updateAirConditionerFromDB,
  deleteAirConditionerTypeFromDB,
  updateAirConditionerStockFromDB,
} from "../services/airConditionerService.js";

const getAllAirConditioners = asyncHandler(async (req, res) => {
  let airConditioners = await getAirConditionersFromDB();

  if (airConditioners) {
    res.status(200).json(airConditioners);
  } else {
    res.status(404);
    throw new Error("Air conditioners not found !");
  }
});

// Fetches all air conditioners from DB.
const getAirConditioners = asyncHandler(async (req, res) => {
  let pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        airConditionerModel: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  let airConditioners = await getAirConditionersFromDB(keyword, page, pageSize);

  if (airConditioners) {
    res.status(200).json(airConditioners);
  } else {
    res.status(404);
    throw new Error("Air conditioners not found !");
  }
});

// Fetches single air conditioner from DB, by ID.
const getAirConditionerByID = asyncHandler(async (req, res) => {
  let airConditioner = await getAirConditionerByIDFromDB(req.params.id);

  if (airConditioner) {
    res.status(200).json(airConditioner);
  } else {
    res.status(404);
    throw new Error("Air conditioner not found !");
  }
});

// Fetches all air conditioners from DB, by given air conditioner model.
const getAirConditionersByModel = asyncHandler(async (req, res) => {
  let airConditioners = await getAirConditionersByModelFromDB(req.params.model);

  if (airConditioners && !(Object.keys(airConditioners).length === 0)) {
    res.status(200).json(airConditioners);
  } else {
    res.status(404);
    throw new Error(
      `Air conditioners with model ${req.params.model} are not found !`
    );
  }
});

// Creates a new air conditioner instance in DB.
const createAirConditioner = asyncHandler(async (req, res) => {
  let createdAirConditionerHelper =
    AirConditionerHelper.createAirConditionerObjectHelper(req.body);

  let createdAirConditioner = await addAirConditioner(
    createdAirConditionerHelper
  );

  if (createdAirConditioner) {
    res.status(201).json(createdAirConditioner);
  } else {
    res.status(500);
    throw new Error("Air conditioner creation failed!");
  }
});

const airConditionerStockDecrease = asyncHandler(async (req, res) => {
  let airConditionerToUpdate = await getAirConditionerByIDFromDB(req.params.id);

  if (!airConditionerToUpdate) {
    res.status(400);
    throw new Error("Air conditioner not found!");
  }

  let updatedAirConditioner = await updateAirConditionerStockFromDB(
    airConditionerToUpdate,
    req.body
  );

  if (!updatedAirConditioner) {
    res.status(500);
    throw new Error("Air conditioner failed to update!");
  }

  res.status(200).json(updatedAirConditioner);
});

// Updates single instance of air conditioner by ID.
const updateAirConditioner = asyncHandler(async (req, res) => {
  let airConditionerToUpdate = await getAirConditionerByIDFromDB(req.params.id);

  if (!airConditionerToUpdate) {
    res.status(400);
    throw new Error("Air conditioner not found!");
  }

  let updatedAirConditionerWithHelper =
    AirConditionerHelper.updateAirConditionerHelper(
      airConditionerToUpdate,
      req.body
    );

  let updatedAirConditioner = await updateAirConditionerFromDB(
    updatedAirConditionerWithHelper
  );

  if (!updatedAirConditioner) {
    res.status(500);
    throw new Error("Air conditioner failed to update!");
  }

  res.status(200).json(updatedAirConditioner);
});

// Deletes single instance of air conditioner from DB, by ID.
const deleteAirConditioner = asyncHandler(async (req, res) => {
  let airConditionerToDelete = await getAirConditionerByIDFromDB(req.params.id);

  if (!airConditionerToDelete) {
    res.status(400);
    throw new Error("Air conditioner not found!");
  }

  let deletedAirConditioner = await deleteAirConditionerTypeFromDB(
    airConditionerToDelete
  );

  if (!deletedAirConditioner) {
    res.status(500);
    throw new Error("Air conditioner deletion failed!");
  }

  res.status(204).json({ message: "Air conditioner deleted successfully!" });
});

export {
  getAllAirConditioners,
  getAirConditioners,
  getAirConditionerByID,
  getAirConditionersByModel,
  createAirConditioner,
  updateAirConditioner,
  deleteAirConditioner,
  airConditionerStockDecrease,
};

/*
 */
