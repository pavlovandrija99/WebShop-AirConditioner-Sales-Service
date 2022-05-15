import roleModel from '../models/roleModel.js';

const getRolesFromDB = async() => {
    const roles = await roleModel.find({});
    return roles;
};

const getRoleByIDFromDB = async(id) => {
    const role = await roleModel.findById(id);
    return role;
};

const getRolesByRoleFromDB = async(role) => {
    const roles = await getRolesFromDB();

    const filteredRoles = [];

    for (const roleIndex in roles) {

        if(roles[roleIndex].roleName.toLowerCase()
                                    .includes(role.toLowerCase())) {

            filteredRoles.push(roles[roleIndex]);
        }
    }

    return filteredRoles;
}

const addRole = async(role) => {
    const addedRole = await role.save();
    return addedRole;
};

const updateRoleFromDB = async(updatedRoleObject) => {
    const updatedRole = await roleModel.
                              findOneAndUpdate({_id: updatedRoleObject._id}, {
                                roleName: updatedRoleObject.roleName
                              }, { new: true });
    return updatedRole;
};

const deleteRoleFromDB = async(roleToDelete) => {
    return await roleToDelete.remove();
};

const findUserRoleIDWithGivenRole = async(role) => {
    let roleFromDB = await roleModel.findOne({roleName: role});
    let roleID = roleFromDB._id.valueOf();

    return roleID;
};

export { getRolesFromDB, getRoleByIDFromDB, addRole, getRolesByRoleFromDB,
         updateRoleFromDB, deleteRoleFromDB, findUserRoleIDWithGivenRole };