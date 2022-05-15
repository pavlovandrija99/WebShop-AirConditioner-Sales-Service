import express from "express";

import  { getAirConditioners, getAirConditionerByID, getAirConditionersByModel,
          createAirConditioner, updateAirConditioner, deleteAirConditioner }
          from '../controllers/airConditionerController.js';

import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(protectRoute, getAirConditioners);
router.route('/:id').get(protectRoute, getAirConditionerByID);
router.route('/airConditionerModel/:model').get(protectRoute, getAirConditionersByModel);
router.route('/').post(protectRoute, createAirConditioner);
router.route('/:id').put(protectRoute, updateAirConditioner);
router.route('/:id').delete(protectRoute, deleteAirConditioner);

export default router;