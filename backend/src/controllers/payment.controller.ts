// src/controllers/payment.controller.ts
import { Request, Response } from "express";
import { PaymentService } from "../services/payment.service";

const paymentService = new PaymentService();

class PaymentController {
  createPaymentIntent = async (req: Request, res: Response) => {
    try {
      const { orderId, amount, currency } = req.body;
      if (!orderId) {
        return res.status(400).json({ success: false, message: "orderId is required" });
      }
      if (!amount) {
        return res.status(400).json({ success: false, message: "Amount is required" });
      }

      // If your paymentService implements createPaymentIntent, this will call it.
      // If not, paymentService should be updated — for now this is safe and returns result or not implemented.
      if (typeof paymentService.createPaymentIntent === "function") {
        const intent = await paymentService.createPaymentIntent(orderId, amount, currency);
        return res.status(200).json({ success: true, data: intent });
      }

      return res.status(501).json({ success: false, message: "Payment not implemented" });
    } catch (err: any) {
      console.error("createPaymentIntent error:", err);
      return res.status(500).json({ success: false, error: err?.message ?? err });
    }
  };

  confirmPayment = async (req: Request, res: Response) => {
    try {
      const { paymentIntentId } = req.body;
      if (!paymentIntentId) {
        return res.status(400).json({ success: false, message: "paymentIntentId is required" });
      }

      if (typeof paymentService.confirmPayment === "function") {
        const result = await paymentService.confirmPayment(paymentIntentId);
        return res.status(200).json({ success: true, data: result });
      }

      return res.status(501).json({ success: false, message: "Payment confirmation not implemented" });
    } catch (err: any) {
      console.error("confirmPayment error:", err);
      return res.status(500).json({ success: false, error: err?.message ?? err });
    }
  };
}

export default new PaymentController();
