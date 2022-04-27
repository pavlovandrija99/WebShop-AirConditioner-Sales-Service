import airConditionerModel from '../models/airConditionerModel.js'

const getAirConditionersFromDB = async() => {
    const airConditioners = await airConditionerModel.find({});
    return airConditioners;
};

const getAirConditionerByIDFromDB = async(id) => {
    const airConditioner = await airConditionerModel.findById(id);
    return airConditioner;
};

const addAirConditioner = async(airConditioner) => {
    const addedAirConditioner = await airConditioner.save();
    return addedAirConditioner;
};

const updateAirConditionerFromDB = async(airConditionerUpdate) => {
    const updatedAirConditioner = await airConditionerModel.
                                  findOneAndUpdate({_id: airConditionerUpdate._id}, {
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
                                    stock: airConditionerUpdate.stock
                                  }, {new: true});
    return updatedAirConditioner
};

const deleteAirConditionerTypeFromDB = async(airConditionerToDelete) => {
    let deletedAirConditioner = await airConditionerModel.deleteOne({_id: airConditionerToDelete._id});
    return deletedAirConditioner;
};


export { getAirConditionersFromDB, getAirConditionerByIDFromDB,
         addAirConditioner, updateAirConditionerFromDB,
         deleteAirConditionerTypeFromDB };

/*
*/