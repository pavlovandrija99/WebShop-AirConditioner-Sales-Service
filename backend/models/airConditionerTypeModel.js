import mongoose from "mongoose";

const airConditionerTypeSchema = mongoose.Schema({
    airConditionerType: {
        type: String,
        required: true
    }
}, {timestamps:true});

const airCondidtionerTypeModel = mongoose.model('airConditionerTypeModel', airConditionerTypeSchema, "AirConditionerType");

export default airCondidtionerTypeModel;