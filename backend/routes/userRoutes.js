import express from "express";

import { getUsers, getUserByID, getUsersByFirstName, getUsersByLastName,
         getUsersByRole, createUser, updateUser, deleteUser }
         from "../controllers/userController.js";

const router = express.Router();

router.route('/').get(getUsers);
router.route('/:id').get(getUserByID);
router.route('/userFirstName/:firstName').get(getUsersByFirstName);
router.route('/userLastName/:lastName').get(getUsersByLastName);
router.route('/userRole/:userRole').get(getUsersByRole);
router.route('/').post(createUser);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);

export default router;