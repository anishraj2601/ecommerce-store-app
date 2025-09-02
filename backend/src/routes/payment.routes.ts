// src/routes/payment.routes.ts
import { Router } from "express";
import paymentController from "../controllers/payment.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/create-intent", authenticate, paymentController.createPaymentIntent);
router.post("/confirm", authenticate, paymentController.confirmPayment);

export default router;
