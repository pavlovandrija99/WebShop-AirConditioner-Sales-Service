import express from "express";

import { getUsers, getUserByID, getUsersByFirstName, getUsersByLastName,
         getUsersByRole, createUser, updateUser, deleteUser, loginUser }
         from "../controllers/userController.js";

import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(getUsers);
router.route('/:id').get(getUserByID);
router.route('/userFirstName/:firstName').get(getUsersByFirstName);
router.route('/userLastName/:lastName').get(getUsersByLastName);
router.route('/userRole/:userRole').get(getUsersByRole);
router.route('/').post(createUser);
router.route('/:id').put(updateUser);
router.route('/:id').delete(protectRoute ,deleteUser);

router.route('/login').post(loginUser);

export default router;