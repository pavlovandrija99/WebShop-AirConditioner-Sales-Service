import express from "express";
import  { getAirConditioners, getAirConditionerByID, createAirConditioner,
        updateAirConditioner, deleteAirConditioner }
        from '../controllers/airConditionerController.js';

const router = express.Router();

router.route('/').get(getAirConditioners);
router.route('/:id').get(getAirConditionerByID);
router.route('/').post(createAirConditioner);
router.route('/:id').put(updateAirConditioner);
router.route('/:id').delete(deleteAirConditioner);

export default router;