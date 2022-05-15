import express from "express";

import { getServices, getServiceByID, createService, updateService ,deleteService }
        from "../controllers/serviceController.js";

import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(protectRoute, getServices);
router.route('/:id').get(protectRoute, getServiceByID);
router.route('/').post(protectRoute, createService);
router.route('/:id').put(protectRoute, updateService);
router.route('/:id').delete(protectRoute, deleteService);

export default router