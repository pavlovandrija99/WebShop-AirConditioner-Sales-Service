import mongoose from "mongoose";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import serviceModel from './serviceModel.js';

dotenv.config();

var crypto = await import ('crypto');

const userSchema = mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roleModel'
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    userFirstName: {
        type: String,
    },
    userLastName: {
        type: String,
    },
    userEmail: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    userAddress: {
        type: String,
    },
    userContactNumber: {
        type: String,
    },
    userUsername: {
        type: String,
        lowercase: true,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid']
    },
    salt: {
        type: String
    },
    hash: {
        type: String
    }
}, { timestamps: true });

userSchema.methods.setPassword = function(password, newPassword) {

    if(newPassword === 'true') {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    }
};

userSchema.methods.validatePassword = function(password) {

    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJWT = function() {

    return jwt.sign({
        id: this._id,
    }, process.env.JWT_SECRET_STRING, {
        expiresIn: '30d'
    });
};

userSchema.methods.forAuthJSON = function() {

    return {
        id: this._id,
        userUsername: this.userUsername,
        userEmail: this.userEmail,
        isAdmin: this.isAdmin,
        token: this.generateJWT()
    }
};

userSchema.pre('remove', async function(next) {
    const services = await serviceModel.find({});

    for(const serviceIndex in services) {
        for(const serviceUserIndex in services[serviceIndex].users) {
            if(services[serviceIndex].users[serviceUserIndex].userID.valueOf() === this._id.valueOf()) {
                let serviceToDelete = await serviceModel.findById(services[serviceIndex]._id.valueOf());
                await serviceToDelete.remove();
            }
        }
    }
    await this.model('orderModel').deleteMany({user: this._id});
    next();
});

const userModel = mongoose.model('userModel', userSchema, "User");

export default userModel;