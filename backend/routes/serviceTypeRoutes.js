import express from "express";

import { getServiceTypes, getServiceTypeByID, getServiceTypesByServiceType,
         createServiceType, updateServiceType, deleteServiceType }
         from "../controllers/serviceTypeController.js";

const router = express.Router();

router.route('/').get(getServiceTypes);
router.route('/:id').get(getServiceTypeByID);
router.route('/').post(createServiceType);
router.route('/serviceType/:serviceType').get(getServiceTypesByServiceType);
router.route('/:id').put(updateServiceType);
router.route('/:id').delete(deleteServiceType);

export default router;