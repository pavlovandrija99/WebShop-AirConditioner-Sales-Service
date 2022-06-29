import express from "express";

import {
  getAirConditioners,
  getAirConditionerByID,
  getAirConditionersByModel,
  createAirConditioner,
  updateAirConditioner,
  deleteAirConditioner,
  airConditionerStockDecrease,
} from "../controllers/airConditionerController.js";

import { protectRoute, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAirConditioners);
router.route("/:id").get(getAirConditionerByID);
router
  .route("/airConditionerModel/:model")
  .get(protectRoute, getAirConditionersByModel);
router.route("/").post(protectRoute, createAirConditioner);
router
  .route("/:id/stock-decrease")
  .put(protectRoute, airConditionerStockDecrease);
router.route("/:id").put(protectRoute, updateAirConditioner);
router.route("/:id").delete(protectRoute, admin, deleteAirConditioner);

export default router;
