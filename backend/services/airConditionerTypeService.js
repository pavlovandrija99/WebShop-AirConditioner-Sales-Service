import airCondidtionerTypeModel from '../models/airConditionerTypeModel.js'

const getAirConditionerTypesFromDB = async () => {
    const airConditionerTypes = await airCondidtionerTypeModel.find({});
    return airConditionerTypes;
};

const getAirConditionerTypeByIDFromDB = async(id) => {
    const airConditionerType = await airCondidtionerTypeModel.findById(id);
    return airConditionerType;
}

const getAirConditionerTypesByTypeFromDB = async(airConditionerType) => {
    const airConditionerTypes = await getAirConditionerTypesFromDB();

    const filteredAirConditionerTypes = [];

    for (const airConditionerTypeIndex in airConditionerTypes) {

        if(airConditionerTypes[airConditionerTypeIndex].airConditionerType.toLowerCase()
                                    .includes(airConditionerType.toLowerCase())) {

            filteredAirConditionerTypes.push(airConditionerTypes[airConditionerTypeIndex]);
        }
    }

    return filteredAirConditionerTypes;
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
    return await airConditionerTypeToDelete.remove();
}

export { getAirConditionerTypesFromDB, getAirConditionerTypeByIDFromDB,
         getAirConditionerTypesByTypeFromDB, addAirConditionerType,
         updateAirConditionerTypeFromDB, deleteAirConditionerTypeFromDB };