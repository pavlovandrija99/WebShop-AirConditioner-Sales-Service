import userModel from '../models/userModel.js'

const getUsersFromDB = async() => {
    const users = await userModel.find({});
    return users;
};

const getUserByIDFromDB = async(id) => {
    const user = await userModel.findById(id);
    return user;
};

const addUser = async(userToCreate) => {
    const createdUser = await userToCreate.save();
    return createdUser;
};

const updateUserFromDB = async(userToUpdate) => {
    const updatedUser = await userModel.findOneAndUpdate({_id: userToUpdate._id},
                                        {role: userToUpdate.role,
                                         userFirstName: userToUpdate.userFirstName,
                                         userLastName: userToUpdate.userLastName,
                                         userEmail: userToUpdate.userEmail,
                                         userAddress: userToUpdate.userAddress,
                                         userContactNumber: userToUpdate.userContactNumber,
                                         userUsername: userToUpdate.userUsername,
                                         password: userToUpdate.password,
                                         salt: userToUpdate.salt,
                                         hash: userToUpdate.hash },
                                         { new:true });
    return updatedUser;
};

const deleteUserFromDB = async(userToDelete) => {
    const deletedUser = await userModel.deleteOne({_id: userToDelete._id});
    return deletedUser;
};

export { getUsersFromDB, getUserByIDFromDB, addUser,updateUserFromDB,
         deleteUserFromDB };