import asyncHandler from 'express-async-handler';

import { getRolesFromDB, getRoleByIDFromDB,
         addRole, updateRoleFromDB, deleteRoleFromDB }
         from '../services/roleService.js';

import roleHelper from '../helpers/roleHelper.js'

// Fetches all roles from DB.
const getRoles = asyncHandler(async(req, res) => {
    let roles = await getRolesFromDB();

    if(roles) {
        res.status(200).json(roles);
    } else {
        res.status(404);
        throw new Error('Roles not found!');
    }
});

// Fetches single role by ID from DB.
const getRoleByID = asyncHandler(async(req, res) => {
    let role = await getRoleByIDFromDB(req.params.id);

    if(role) {
        res.status(200).json(role);
    } else {
        res.status(404);
        throw new Error('Role not found!');
    }
});

// Creates a new role instance in DB.
const createRole = asyncHandler(async(req, res) =>{
    let createdRoleHelper = roleHelper.createRoleObjectHelper(req.body);

    let createdRole = await addRole(createdRoleHelper);

    if(createdRole) {
        res.status(201).json(createdRole);
    } else {
        res.status(500);
        throw new Error('Role creation failed!');
    }
});

// Updates single instance of role by ID.
const updateRole = asyncHandler(async(req, res) => {
    let roleToUpdate = await getRoleByIDFromDB(req.params.id);

    if(!roleToUpdate) {
        res.status(400);
        throw new Error('Role not found!');
    }

    let updatedRoleWithHelper = roleHelper.updateRoleHelper(roleToUpdate, req.body);

    let updatedRole = await updateRoleFromDB(updatedRoleWithHelper);

    if(!updatedRole) {
        res.status(500);
        throw new Error('Role failed to update!');
    }

    res.status(200).json(updatedRole);
});

// Deletes single instance of role from DB, by ID.
const deleteRole = asyncHandler(async(req, res) => {
    let roleToDelete = await getRoleByIDFromDB(req.params.id);

    if(!roleToDelete) {
        res.status(400);
        throw new Error('Role not found!');
    }

    let deletedRole = await deleteRoleFromDB(roleToDelete);

    if(!deletedRole) {
        res.status(500);
        throw new Error('Role deletion failed!');
    }

    res.status(204).json({message: 'Role deleted successfully!'});
});

export { getRoles, getRoleByID, createRole, updateRole, deleteRole };

/*
*/