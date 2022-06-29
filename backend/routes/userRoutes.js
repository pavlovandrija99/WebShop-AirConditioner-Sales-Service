import express from "express";

import {
  getUsers,
  getUserByID,
  getUsersByFirstName,
  getUsersByLastName,
  getUsersByRole,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserByEmail,
} from "../controllers/userController.js";

import { protectRoute, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protectRoute, admin, getUsers);
router.route("/:id").get(protectRoute, getUserByID);
router
  .route("/userFirstName/:firstName")
  .get(protectRoute, getUsersByFirstName);
router.route("/userLastName/:lastName").get(protectRoute, getUsersByLastName);
router.route("/userRole/:userRole").get(protectRoute, getUsersByRole);
router.route("/userEmail/:email").get(protectRoute, getUserByEmail);
router.route("/").post(protectRoute, createUser);
router.route("/:id").put(protectRoute, updateUser);
router.route("/:id").delete(protectRoute, admin, deleteUser);

router.route("/login").post(loginUser);

export default router;
