import mongoose from "mongoose";

const airConditionerTypeSchema = mongoose.Schema({
    airConditionerType: {
        type: String,
        required: true
    }
}, {timestamps:true});

airConditionerTypeSchema.pre('remove', async function(next) {
    await this.model('airConditionerModel').deleteMany({airConditionerType: this._id});
    next();
})

const airCondidtionerTypeModel = mongoose.model('airConditionerTypeModel', airConditionerTypeSchema, "AirConditionerType");

export default airCondidtionerTypeModel;