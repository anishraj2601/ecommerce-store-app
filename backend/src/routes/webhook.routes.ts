// src/routes/webhook.routes.ts
import express, { Request, Response } from "express";
import { PaymentService } from "../services/payment.service";

const router = express.Router();
const paymentService = new PaymentService();

router.post(
  "/stripe",
  // raw body is required for Stripe signature verification
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    try {
      const signature = (req.headers["stripe-signature"] as string) || "";
      // req.body is a Buffer because of express.raw middleware
      await paymentService.handleWebhook(req.body as Buffer, signature);
      return res.status(200).send("ok");
    } catch (err: any) {
      console.error("Stripe webhook handling error:", err);
      return res.status(400).send(`Webhook Error: ${err?.message ?? String(err)}`);
    }
  }
);

export default router;
