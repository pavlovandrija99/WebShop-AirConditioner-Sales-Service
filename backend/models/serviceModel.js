import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    serviceType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'serviceTypeModel'
    },
    airConditioner: {
        type: mongoose.Schema.Types.ObjectId,
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

serviceSchema.pre('remove', async function(next) {
    await this.model('orderItemModel').deleteMany({service: this._id});
    next();
});

const serviceModel = mongoose.model('serviceModel', serviceSchema, "Service");

export default serviceModel;