import express from "express";
import { getAirConditionerTypes, getAirConditionerTypeByID,
         getAirConditionerTypesByType, createAirConditionerType,
         updateAirConditionerType, deleteAirConditionerType }
         from '../controllers/airConditionerTypeController.js'

const router = express.Router();

router.route('/').get(getAirConditionerTypes);
router.route('/:id').get(getAirConditionerTypeByID);
router.route('/airConditionerType/:type').get(getAirConditionerTypesByType);
router.route('/').post(createAirConditionerType);
router.route('/:id').put(updateAirConditionerType);
router.route('/:id').delete(deleteAirConditionerType);

export default router;
