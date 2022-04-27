import roleModel from "../models/roleModel.js";

export default class roleHelper {

    static createRoleObjectHelper(requestBody) {
        return new roleModel({
            roleName: requestBody.roleName
        });
    }

    static updateRoleHelper(roleToUpdate, requestBody) {
        return new roleModel({
            _id: roleToUpdate._id,
            roleName: requestBody.roleName
        });
    };
};