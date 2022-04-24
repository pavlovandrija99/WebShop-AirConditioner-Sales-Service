import mongoose from "mongoose";

const airConditionerTypeSchema = mongoose.Schema({
    airCondidtionerTypeName: {
        type: String,
        required: true
    }
}, { timestamps: true });

const airCondidtionerTypeModel = mongoose.model('airConditionerTypeModel', airConditionerTypeSchema);

export default airCondidtionerTypeModel;