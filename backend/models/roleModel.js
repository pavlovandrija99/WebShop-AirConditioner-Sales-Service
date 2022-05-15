import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
    roleName: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Before role is removed from db, remove all related users with that role.
roleSchema.pre('remove', async function(next) {
    await this.model('userModel').deleteMany({role: this._id});
    next();
});

const roleModel = mongoose.model('roleModel', roleSchema, "Role");

export default roleModel;

