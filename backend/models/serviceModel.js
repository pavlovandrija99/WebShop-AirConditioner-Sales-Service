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
    users: [
        {
            userID: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'userModel'
            }
        }
    ]
}, { timestamps: true });

const serviceModel = mongoose.model('serviceModel', serviceSchema);

export default serviceModel;