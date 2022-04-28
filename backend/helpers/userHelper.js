import userModel from "../models/userModel.js";
import mongoose from "mongoose";

export default class UserHelper {

    static createUserObjectHelper(requestBody) {

        var createdUser = new userModel({
            role: mongoose.Types.ObjectId(requestBody.role),
            userFirstName: requestBody.userFirstName,
            userLastName: requestBody.userLastName,
            userEmail: requestBody.userEmail,
            userAddress: requestBody.userAddress,
            userContactNumber: requestBody.userContactNumber,
            userUsername: requestBody.userUsername,
            password: requestBody.password
        });

        var newPassword = 'true';
        createdUser.setPassword(createdUser.password, newPassword);
        return createdUser;
    };

    static updateUserHelper(userToUpdate, requestBody) {

        var newPassword = (userToUpdate.password === requestBody.password) ? "false" : "true";

        var updatedUser = new userModel({
            _id: userToUpdate._id,
            role: requestBody.role,
            userFirstName: requestBody.userFirstName,
            userLastName: requestBody.userLastName,
            userEmail: requestBody.userEmail,
            userAddress: requestBody.userAddress,
            userContactNumber: requestBody.userContactNumber,
            userUsername: requestBody.userUsername,
            password: requestBody.password
        });

        updatedUser.setPassword(requestBody.password, newPassword);
        return updatedUser;
    };
}