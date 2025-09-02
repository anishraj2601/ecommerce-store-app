"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_service_1 = require("../services/payment.service");
const router = express_1.default.Router();
const paymentService = new payment_service_1.PaymentService();
router.post("/stripe", express_1.default.raw({ type: "application/json" }), async (req, res) => {
    try {
        const signature = req.headers["stripe-signature"] || "";
        await paymentService.handleWebhook(req.body, signature);
        return res.status(200).send("ok");
    }
    catch (err) {
        console.error("Stripe webhook handling error:", err);
        return res.status(400).send(`Webhook Error: ${err?.message ?? String(err)}`);
    }
});
exports.default = router;
//# sourceMappingURL=webhook.routes.js.map