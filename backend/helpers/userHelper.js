import userModel from "../models/userModel.js";
import mongoose from "mongoose";

export default class UserHelper {

    static createUserObjectHelper(requestBody) {

        var createdUser = new userModel({
            userFirstName: requestBody.firstName,
            userLastName: requestBody.lastName,
            userEmail: requestBody.email,
            userAddress: requestBody.userAddress,
            userContactNumber: requestBody.userContactNumber,
            userUsername: requestBody.userName,
            isAdmin: requestBody.isAdmin
        });

        var newPassword = 'true';
        createdUser.setPassword(requestBody.password, newPassword);
        return createdUser;
    };

    static updateUserHelper(userToUpdate, requestBody) {

        var newPassword = userToUpdate.validatePassword(requestBody.password) ? "false": "true"

        var updatedUser = new userModel({
            _id: userToUpdate._id,
            role: userToUpdate.role,
            userFirstName: requestBody.firstName,
            userLastName: requestBody.lastName,
            userEmail: requestBody.email,
            userAddress: requestBody.userAddress,
            userContactNumber: requestBody.userContactNumber,
            userUsername: requestBody.userName,
        });

        updatedUser.setPassword(requestBody.password, newPassword);
        return updatedUser;
    };

    static async authenticateUser(requestBody) {

        let user = await userModel.findOne({ userEmail: requestBody.email });

        if(user && (user.validatePassword(requestBody.password))) {
            return user.forAuthJSON();
        }
    }
}