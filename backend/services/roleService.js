import roleModel from '../models/roleModel.js';

const getRolesFromDB = async() => {
    const roles = await roleModel.find({});
    return roles;
};

const getRoleByIDFromDB = async(id) => {
    const role = await roleModel.findById(id);
    return role;
};

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
    const deletedRole = await roleModel.deleteOne({_id: roleToDelete._id});
    return deletedRole;
};

export { getRolesFromDB, getRoleByIDFromDB, addRole,
         updateRoleFromDB, deleteRoleFromDB };