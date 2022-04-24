import mongoose from "mongoose";

const serviceTypeSchema = mongoose.Schema({
    serviceTypeName: {
        type: String,
        required: true
    }
}, { timestamps: true });

const serviceTypeModel = mongoose.model('serviceTypeModel', serviceTypeSchema);

export default serviceTypeModel;