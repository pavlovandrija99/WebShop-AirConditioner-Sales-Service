import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
    roleName: {
        type: String,
        required: true
    }
}, { timestamps: true });

const roleModel = mongoose.model('roleModel', roleSchema, "Role");

export default roleModel;

