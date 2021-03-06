import airConditionerModel from "../models/airConditionerModel.js";

const getAirConditionersFromDB = async (keyword, page, pageSize) => {
  const count = await airConditionerModel.count({ ...keyword });

  const airConditioners = await airConditionerModel
    .find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  return { airConditioners, page, pages: Math.ceil(count / pageSize) };
};

const getAirConditionerByIDFromDB = async (id) => {
  const airConditioner = await airConditionerModel.findById(id);
  return airConditioner;
};

const getAirConditionersByModelFromDB = async (airConditionerModel) => {
  const airConditioners = await getAirConditionersFromDB();

  const filteredAirConditioners = [];

  for (const airConditionerIndex in airConditioners) {
    if (
      airConditioners[airConditionerIndex].airConditionerModel
        .toLowerCase()
        .includes(airConditionerModel.toLowerCase())
    ) {
      filteredAirConditioners.push(airConditioners[airConditionerIndex]);
    }
  }

  return filteredAirConditioners;
};

const addAirConditioner = async (airConditioner) => {
  const addedAirConditioner = await airConditioner.save();
  return addedAirConditioner;
};

const updateAirConditionerStockFromDB = async (airConditionerObj, reqBody) => {

  const updatedAirConditioner = await airConditionerModel.findOneAndUpdate(
    { _id: airConditionerObj._id },
    {
      airConditionerType: airConditionerObj.airConditionerType,
      airConditionerModel: airConditionerObj.airConditionerModel,
      powerConsumption: airConditionerObj.powerConsumption,
      operatingTemperatureRange: airConditionerObj.operatingTemperatureRange,
      outdoorUnitDimension: airConditionerObj.outdoorUnitDimension,
      indoorUnitDimension: airConditionerObj.indoorUnitDimension,
      coolingCapacity: airConditionerObj.coolingCapacity,
      heatingCapacity: airConditionerObj.heatingCapacity,
      energyClass: airConditionerObj.energyClass,
      airConditionerDescription: airConditionerObj.airConditionerDescription,
      airConditionerPrice: airConditionerObj.airConditionerPrice,
      stock: airConditionerObj.stock - reqBody.quantity,
    }, { new: true }
  );

  return updatedAirConditioner;
};

const updateAirConditionerFromDB = async (airConditionerUpdate) => {
  const updatedAirConditioner = await airConditionerModel.findOneAndUpdate(
    { _id: airConditionerUpdate._id },
    {
      airConditionerType: airConditionerUpdate.airConditionerType,
      airConditionerModel: airConditionerUpdate.airConditionerModel,
      powerConsumption: airConditionerUpdate.powerConsumption,
      operatingTemperatureRange: airConditionerUpdate.operatingTemperatureRange,
      outdoorUnitDimension: airConditionerUpdate.outdoorUnitDimension,
      indoorUnitDimension: airConditionerUpdate.indoorUnitDimension,
      coolingCapacity: airConditionerUpdate.coolingCapacity,
      heatingCapacity: airConditionerUpdate.heatingCapacity,
      energyClass: airConditionerUpdate.energyClass,
      airConditionerDescription: airConditionerUpdate.airConditionerDescription,
      airConditionerPrice: airConditionerUpdate.airConditionerPrice,
      stock: airConditionerUpdate.stock,
    },
    { new: true }
  );
  return updatedAirConditioner;
};

const deleteAirConditionerTypeFromDB = async (airConditionerToDelete) => {
  let deletedAirConditioner = await airConditionerModel.deleteOne({
    _id: airConditionerToDelete._id,
  });
  return deletedAirConditioner;
};

export {
  getAirConditionersFromDB,
  getAirConditionerByIDFromDB,
  getAirConditionersByModelFromDB,
  addAirConditioner,
  updateAirConditionerFromDB,
  deleteAirConditionerTypeFromDB,
  updateAirConditionerStockFromDB,
};

/*
 */
