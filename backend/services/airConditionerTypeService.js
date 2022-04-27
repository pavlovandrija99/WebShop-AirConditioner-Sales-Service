import airCondidtionerTypeModel from '../models/airConditionerTypeModel.js'

const getAirConditionerTypesFromDB = async () => {
    const airConditionerTypes = await airCondidtionerTypeModel.find({});
    return airConditionerTypes;
};

const getAirConditionerTypeByIDFromDB = async(id) => {
    const airConditionerType = await airCondidtionerTypeModel.findById(id);
    return airConditionerType;
}

const addAirConditionerType = async(airConditionerType) => {
    const addedAirConditionerType = await airConditionerType.save();
    return addedAirConditionerType;
};

const updateAirConditionerTypeFromDB = async(airConditionerTypeUpdate) => {
    const updatedAirConditionerType = await airCondidtionerTypeModel.
                                      findOneAndUpdate({_id: airConditionerTypeUpdate._id}, {
                                            airConditionerType: airConditionerTypeUpdate.airConditionerType
                                      }, { new: true });
    return updatedAirConditionerType;
}

const deleteAirConditionerTypeFromDB = async(airConditionerTypeToDelete) => {
    const deletedAiConditionerType = await airCondidtionerTypeModel.deleteOne({_id: airConditionerTypeToDelete._id});
    return deletedAiConditionerType;
}

export { getAirConditionerTypesFromDB, getAirConditionerTypeByIDFromDB,
         addAirConditionerType, updateAirConditionerTypeFromDB,
         deleteAirConditionerTypeFromDB };