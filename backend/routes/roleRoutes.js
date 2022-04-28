import express from "express";
import { getRoles, getRoleByID,
         createRole, updateRole, deleteRole }
         from "../controllers/roleController.js";

const router = express.Router();

router.route('/').get(getRoles);
router.route('/:id').get(getRoleByID);
router.route('/').post(createRole);
router.route('/:id').put(updateRole);
router.route('/:id').delete(deleteRole);

export default router;