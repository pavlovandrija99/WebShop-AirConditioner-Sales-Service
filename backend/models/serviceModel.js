import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    serviceType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'serviceTypeModel'
    },
    airConditioner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'airConditionerModel'
    },
    users: [{
            _id: false,
            userID: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'userModel'
            }
    }]
}, { timestamps: true });

const serviceModel = mongoose.model('serviceModel', serviceSchema, "Service");

export default serviceModel;