import express from "express";

import { getAirConditionerTypes, getAirConditionerTypeByID,
         getAirConditionerTypesByType, createAirConditionerType,
         updateAirConditionerType, deleteAirConditionerType }
         from '../controllers/airConditionerTypeController.js'

import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(protectRoute, getAirConditionerTypes);
router.route('/:id').get(protectRoute, getAirConditionerTypeByID);
router.route('/airConditionerType/:type').get(protectRoute, getAirConditionerTypesByType);
router.route('/').post(protectRoute, createAirConditionerType);
router.route('/:id').put(protectRoute, updateAirConditionerType);
router.route('/:id').delete(protectRoute, deleteAirConditionerType);

export default router;
