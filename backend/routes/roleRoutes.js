import express from "express";

import { getRoles, getRoleByID, getRolesByRole,
         createRole, updateRole, deleteRole }
         from "../controllers/roleController.js";

import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(protectRoute, getRoles);
router.route('/:id').get(protectRoute, getRoleByID);
router.route('/role/:role').get(protectRoute, getRolesByRole);
router.route('/').post(protectRoute, createRole);
router.route('/:id').put(protectRoute, updateRole);
router.route('/:id').delete(protectRoute, deleteRole);

export default router;