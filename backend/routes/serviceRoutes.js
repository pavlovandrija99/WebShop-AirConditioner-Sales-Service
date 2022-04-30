import express from "express";

import { getServices, getServiceByID, createService, updateService ,deleteService }
        from "../controllers/serviceController.js";

const router = express.Router();

router.route('/').get(getServices);
router.route('/:id').get(getServiceByID);
router.route('/').post(createService);
router.route('/:id').put(updateService);
router.route('/:id').delete(deleteService);

export default router