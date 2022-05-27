import express from "express";

import { getUsers, getUserByID, getUsersByFirstName, getUsersByLastName,
         getUsersByRole, createUser, updateUser, deleteUser, loginUser }
         from "../controllers/userController.js";

import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(protectRoute, getUsers);
router.route('/:id').get(protectRoute, getUserByID);
router.route('/userFirstName/:firstName').get(protectRoute, getUsersByFirstName);
router.route('/userLastName/:lastName').get(protectRoute, getUsersByLastName);
router.route('/userRole/:userRole').get(protectRoute, getUsersByRole);
router.route('/').post(createUser);
router.route('/:id').put(protectRoute, updateUser);
router.route('/:id').delete(protectRoute, deleteUser);

router.route('/login').post(loginUser);

export default router;