"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payment_service_1 = require("../services/payment.service");
const paymentService = new payment_service_1.PaymentService();
class PaymentController {
    constructor() {
        this.createPaymentIntent = async (req, res) => {
            try {
                const { orderId, amount, currency } = req.body;
                if (!orderId) {
                    return res.status(400).json({ success: false, message: "orderId is required" });
                }
                if (!amount) {
                    return res.status(400).json({ success: false, message: "Amount is required" });
                }
                if (typeof paymentService.createPaymentIntent === "function") {
                    const intent = await paymentService.createPaymentIntent(orderId, amount, currency);
                    return res.status(200).json({ success: true, data: intent });
                }
                return res.status(501).json({ success: false, message: "Payment not implemented" });
            }
            catch (err) {
                console.error("createPaymentIntent error:", err);
                return res.status(500).json({ success: false, error: err?.message ?? err });
            }
        };
        this.confirmPayment = async (req, res) => {
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
            }
            catch (err) {
                console.error("confirmPayment error:", err);
                return res.status(500).json({ success: false, error: err?.message ?? err });
            }
        };
    }
}
exports.default = new PaymentController();
//# sourceMappingURL=payment.controller.js.map