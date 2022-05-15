import express from "express";

import { getServiceTypes, getServiceTypeByID, getServiceTypesByServiceType,
         createServiceType, updateServiceType, deleteServiceType }
         from "../controllers/serviceTypeController.js";

import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(protectRoute, getServiceTypes);
router.route('/:id').get(protectRoute, getServiceTypeByID);
router.route('/').post(protectRoute, createServiceType);
router.route('/serviceType/:serviceType').get(protectRoute, getServiceTypesByServiceType);
router.route('/:id').put(protectRoute, updateServiceType);
router.route('/:id').delete(protectRoute, deleteServiceType);

export default router;