import mongoose from "mongoose";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config();

var crypto = await import ('crypto');

const userSchema = mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roleModel'
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
    password: {
        type: String
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
        userName: this.userUsername
        //exp: parseInt(exp.getTime() / 1000)
    }, process.env.JWT_SECRET_STRING, {
        expiresIn: '30d'
    });
};

userSchema.methods.forAuthJSON = function() {

    return {
        userName: this.userUsername,
        userEmail: this.userEmail,
        token: this.generateJWT()
    }
};

const userModel = mongoose.model('userModel', userSchema, "User");

export default userModel;