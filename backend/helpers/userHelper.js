import userModel from "../models/userModel.js";

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

        var updatedUser = new userModel({
            _id: userToUpdate._id,
            role: userToUpdate.role,
            userFirstName: requestBody.firstName,
            userLastName: requestBody.lastName,
            userEmail: requestBody.email,
            userAddress: userToUpdate.userAddress,
            userContactNumber: userToUpdate.userContactNumber,
            userUsername: requestBody.userName,
            isAdmin: requestBody.isAdmin
        });

        return updatedUser;
    };

    static async authenticateUser(requestBody) {

        let user = await userModel.findOne({ userEmail: requestBody.email });

        if(user && (user.validatePassword(requestBody.password))) {
            return user.forAuthJSON();
        }
    }
}