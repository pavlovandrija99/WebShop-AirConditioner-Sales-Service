import asyncHandler from 'express-async-handler';

import UserHelper from '../helpers/userHelper.js';

import { getUsersFromDB, getUserByIDFromDB, getUsersByFirstNameFromDB,
         getUsersByLastNameFromDB, getUsersByRoleFromDB,addUser, updateUserFromDB,
         deleteUserFromDB } from '../services/userService.js';

// Fetches all users from DB.
const getUsers = asyncHandler(async(req, res) => {
    let users = await getUsersFromDB();

    if(users) {
        res.status(200).json(users);
    } else {
        res.status(404);
        throw new Error('Users not found!');
    }
});

// Fetches single user by ID from DB.
const getUserByID = asyncHandler(async(req, res) => {
    let user = await getUserByIDFromDB(req.params.id);

    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found!');
    }
});

// Fetches all users from DB, by user first name.
const getUsersByFirstName = asyncHandler(async(req, res) => {
    let users = await getUsersByFirstNameFromDB(req.params.firstName);

    if(users && !(Object.keys(users).length === 0)) {
        res.status(200).json(users);
    } else {
        res.status(404);
        throw new Error(`Users with first name ${req.params.firstName} are not found !`);
    }
});

// Fetches all users from DB, by user last name.
const getUsersByLastName = asyncHandler(async(req, res) => {
    let users = await getUsersByLastNameFromDB(req.params.lastName);

    if(users && !(Object.keys(users).length === 0)) {
        res.status(200).json(users);
    } else {
        res.status(404);
        throw new Error(`Users with last name ${req.params.lastName} are not found !`);
    }
});

// Fetches all users from DB, by user role.
const getUsersByRole = asyncHandler(async(req, res) => {
    let users = await getUsersByRoleFromDB(req.params.userRole);

    if(users && !(Object.keys(users).length === 0)) {
        res.status(200).json(users);
    } else {
        res.status(404);
        throw new Error(`Users with role ${req.params.userRole} are not found !`);
    }
});

// Creates a new user instance in DB.
const createUser = asyncHandler(async(req, res) => {
    let createdUserWithHelper = UserHelper.createUserObjectHelper(req.body);

    let createdUser = await addUser(createdUserWithHelper);

    if(createdUser) {
        res.status(201).json({
            role: createUser.role,
            userFirstName: createdUser.userFirstName,
            userLastName: createdUser.userLastName,
            userEmail: createdUser.userEmail,
            userAddress: createdUser.userAddress,
            userContactNumber: createdUser.userContactNumber,
            userUsername: createdUser.userUsername
        });
    } else {
        res.status(500);
        throw new Error('User creation failed!');
    }
});

// Updates single instance of user by ID.
const updateUser = asyncHandler(async(req, res) => {
    let userToUpdate = await getUserByIDFromDB(req.params.id);

    if(!userToUpdate) {
        res.status(400);
        throw new Error('User not found!');
    }

    let updatedUserWithHelper = UserHelper.updateUserHelper(userToUpdate, req.body);

    let updatedUser = await updateUserFromDB(updatedUserWithHelper);

    if(!updatedUser) {
        res.status(500);
        throw new Error('User failed to update!');
    }

    res.status(200).json(updatedUser);
});

// Deletes single instance of user from DB, by ID.
const deleteUser = asyncHandler(async(req, res) => {
    let userToDelete = await getUserByIDFromDB(req.params.id);

    if(!userToDelete) {
        res.status(400);
        throw new Error('User not found!');
    }

    let deletedUser = await deleteUserFromDB(userToDelete);

    if(!deletedUser) {
        res.status(500);
        throw new Error('User deletion failed!');
    }

    res.status(204).json({message: 'User deleted successfully!'});
});

// Logins user, checks users credentials, returns JWT to the user.
const loginUser = asyncHandler(async(req, res) => {
    let authJSON = await UserHelper.authenticateUser(req.body);

    if(authJSON) {
        res.json(authJSON);
    } else {
        res.status(401);
        throw new Error('Invalid email or password!');
    }
});

export { getUsers, getUserByID, getUsersByFirstName, getUsersByLastName,
         getUsersByRole, createUser, updateUser, deleteUser, loginUser };