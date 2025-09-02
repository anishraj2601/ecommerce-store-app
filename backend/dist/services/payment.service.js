"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const config_1 = require("../config");
const order_service_1 = require("./order.service");
const logger_1 = require("../utils/logger");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: process.env.STRIPE_API_VERSION,
});
class PaymentService {
    constructor() {
        this.orderService = new order_service_1.OrderService();
    }
    async createPaymentIntent(orderId, amount, currency = "usd") {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100),
                currency,
                metadata: {
                    orderId,
                },
                automatic_payment_methods: { enabled: true },
            });
            if (orderId) {
                try {
                    await this.orderService.updateOrder(orderId, { status: "PENDING" });
                }
                catch (err) {
                    logger_1.logger.error("Failed to mark order PENDING:", err);
                }
            }
            return {
                clientSecret: paymentIntent.client_secret ?? null,
                paymentIntentId: paymentIntent.id,
            };
        }
        catch (error) {
            logger_1.logger.error("Error creating payment intent:", error);
            throw new Error("Failed to create payment intent");
        }
    }
    async confirmPayment(paymentIntentId) {
        try {
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
            const orderId = paymentIntent.metadata?.orderId;
            if (paymentIntent.status === "succeeded" && orderId) {
                try {
                    await this.orderService.updateOrder(orderId, { status: "CONFIRMED" });
                }
                catch (err) {
                    logger_1.logger.error("Failed to update order status to CONFIRMED:", err);
                }
            }
            return paymentIntent;
        }
        catch (error) {
            logger_1.logger.error("Error confirming payment:", error);
            throw new Error("Failed to confirm payment");
        }
    }
    async handleWebhook(body, signature) {
        try {
            const webhookSecret = config_1.config?.stripe?.webhookSecret || process.env.STRIPE_WEBHOOK_SECRET || "";
            let event;
            if (webhookSecret) {
                event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
            }
            else {
                event = JSON.parse(body.toString());
            }
            switch (event.type) {
                case "payment_intent.succeeded":
                    await this.handlePaymentSuccess(event.data.object);
                    break;
                case "payment_intent.payment_failed":
                    await this.handlePaymentFailure(event.data.object);
                    break;
                default:
                    logger_1.logger.info(`Unhandled Stripe event type: ${event.type}`);
            }
            return { received: true };
        }
        catch (error) {
            logger_1.logger.error("Webhook error:", error);
            throw error;
        }
    }
    async handlePaymentSuccess(paymentIntent) {
        try {
            const orderId = paymentIntent.metadata?.orderId;
            if (!orderId) {
                logger_1.logger.warn("Payment succeeded but no orderId in metadata", { paymentIntentId: paymentIntent.id });
                return;
            }
            try {
                await this.orderService.updateOrder(orderId, { status: "CONFIRMED" });
                logger_1.logger.info(`Payment succeeded and order confirmed: ${orderId}`);
            }
            catch (err) {
                logger_1.logger.error(`Failed to update order ${orderId} after successful payment:`, err);
            }
        }
        catch (err) {
            logger_1.logger.error("Error in handlePaymentSuccess:", err);
        }
    }
    async handlePaymentFailure(paymentIntent) {
        try {
            const orderId = paymentIntent.metadata?.orderId;
            if (!orderId) {
                logger_1.logger.warn("Payment failed but no orderId in metadata", { paymentIntentId: paymentIntent.id });
                return;
            }
            try {
                await this.orderService.updateOrder(orderId, { status: "CANCELLED" });
                logger_1.logger.info(`Payment failed and order cancelled: ${orderId}`);
            }
            catch (err) {
                logger_1.logger.error(`Failed to update order ${orderId} after failed payment:`, err);
            }
        }
        catch (err) {
            logger_1.logger.error("Error in handlePaymentFailure:", err);
        }
    }
}
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map