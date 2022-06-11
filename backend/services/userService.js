import userModel from "../models/userModel.js";

import { findUserRoleIDWithGivenRole } from "./roleService.js";

const getUsersFromDB = async () => {
  const users = await userModel.find({});
  return users;
};

const getUserByIDFromDB = async (id) => {
  const user = await userModel.findById(id).select("-salt -hash");
  console.log(`user: ${user}`);
  return user;
};

const getUsersByFirstNameFromDB = async (userFirstName) => {
  const users = await getUsersFromDB();

  const filteredUsers = [];

  for (const userIndex in users) {
    if (
      users[userIndex].userFirstName
        .toLowerCase()
        .includes(userFirstName.toLowerCase())
    ) {
      filteredUsers.push(users[userIndex]);
    }
  }

  return filteredUsers;
};

const getUsersByLastNameFromDB = async (userLastName) => {
  const users = await getUsersFromDB();

  const filteredUsers = [];

  for (const userIndex in users) {
    if (
      users[userIndex].userLastName
        .toLowerCase()
        .includes(userLastName.toLowerCase())
    ) {
      filteredUsers.push(users[userIndex]);
    }
  }

  return filteredUsers;
};

const getUsersByRoleFromDB = async (userRole) => {
  const users = await getUsersFromDB();
  const roleID = await findUserRoleIDWithGivenRole(userRole);
  const filteredUsers = [];

  for (const userIndex in users) {
    if (users[userIndex].role.valueOf() === roleID) {
      filteredUsers.push(users[userIndex]);
    }
  }

  return filteredUsers;
};

const getUserByEmailFromDB = async (email) => {
  const user = await userModel.findOne({ userEmail: email });
  return user;
};

const addUser = async (userToCreate) => {
  const createdUser = await userToCreate.save();
  return createdUser;
};

const updateUserFromDB = async (userToUpdate) => {
  const updatedUser = await userModel.findOneAndUpdate(
    { _id: userToUpdate._id },
    {
      role: userToUpdate.role,
      userFirstName: userToUpdate.userFirstName,
      userLastName: userToUpdate.userLastName,
      userEmail: userToUpdate.userEmail,
      userAddress: userToUpdate.userAddress,
      userContactNumber: userToUpdate.userContactNumber,
      userUsername: userToUpdate.userUsername,
      salt: userToUpdate.salt,
      hash: userToUpdate.hash,
    },
    { new: true }
  );
  return updatedUser;
};

const deleteUserFromDB = async (userToDelete) => {
  return await userToDelete.remove();
};

export {
  getUsersFromDB,
  getUserByIDFromDB,
  getUsersByFirstNameFromDB,
  getUserByEmailFromDB,
  getUsersByLastNameFromDB,
  getUsersByRoleFromDB,
  addUser,
  updateUserFromDB,
  deleteUserFromDB,
};
