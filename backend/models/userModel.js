import mongoose from "mongoose";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config();

var crypto = await import ('crypto');

var secretString = process.env.SECRET_STRING;

const userSchema = mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'roleModel'
    },
    userFirstName: {
        type: String,
        required: true
    },
    userLastName: {
        type: String,
        required: true
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
        required: true
    },
    userContactNumber: {
        type: String,
        required: true
    },
    userUsername: {
        type: String,
        unique: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid']
    },
    password: {
        type: String,
        required: true
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
    var today = new Date();
    var tokenExpirationDate = new Date(today);
    tokenExpirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        userName: this.userUsername,
        exp: parseInt(exp.getTime() / 1000)
    }, secretString);
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