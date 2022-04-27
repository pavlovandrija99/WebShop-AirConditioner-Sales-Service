import mongoose from "mongoose";

const airConditionerSchema = mongoose.Schema({
    airConditionerType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'airConditionerTypeModel'
    },
    airConditionerModel: {
        type: String,
        required: true
    },
    airConditionerPrice: {
        type: String,
        required: true
    },
    powerConsumption: {
        type: String,
        required: true
    },
    operatingTemperatureRange: {
        type: String,
        required: true
    },
    indoorUnitDimension: {
        type: String,
        required: true
    },
    outdoorUnitDimension: {
        type: String,
        required: true
    },
    coolingCapacity: {
        type: String,
        required: true
    },
    heatingCapacity: {
        type: String,
        required: true
    },
    energyClass: {
        type: String,
        required: true
    },
    airConditionerDescription: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const airConditionerModel = mongoose.model('airConditionerModel', airConditionerSchema, "Air Condition");

export default airConditionerModel;