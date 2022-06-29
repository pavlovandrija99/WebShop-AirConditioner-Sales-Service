import express from "express";
import {
  createCheckoutSession,
  stripeWebhook,
} from "../controllers/stripeController.js";

const router = express.Router();

router.route("/create-checkout-session").post(createCheckoutSession);
router
  .route(
    "/webhook",
    express.json({
      type: "application/json",
    })
  )
  .post(stripeWebhook);

export default router;
