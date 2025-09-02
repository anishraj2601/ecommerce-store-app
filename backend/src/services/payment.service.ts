// src/services/payment.service.ts
import Stripe from "stripe";
import { config } from "../config";
import { OrderService } from "./order.service";
import { logger } from "../utils/logger";

/**
 * NOTE:
 * - We avoid relying on literal apiVersion types by reading an env var (if provided)
 *   and casting to `any`. If you want a specific API version, set STRIPE_API_VERSION
 *   in your env (or remove the option to use Stripe's default).
 */
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  logger.error("STRIPE_SECRET_KEY is not set in environment variables.");
  throw new Error("Stripe secret key is required.");
}
const stripe = new Stripe(stripeSecretKey, {
  ...(process.env.STRIPE_API_VERSION && { apiVersion: process.env.STRIPE_API_VERSION as Stripe.ApiVersion }),
});

export class PaymentService {
  private orderService = new OrderService();

  /**
   * Create a payment intent for an order.
   * Stores a simple status update on the order (PENDING). We intentionally do not
   * require the ability to set arbitrary fields on the order here — status changes
   * are handled via updateOrder/updateStatus on OrderService.
   */
  async createPaymentIntent(
    orderId: string,
    amount: number,
    currency = "usd"
  ): Promise<{ clientSecret: string | null; paymentIntentId: string }> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // convert dollars -> cents
        currency,
        metadata: {
          orderId,
        },
        automatic_payment_methods: { enabled: true },
      });

      // If an orderId is present, mark the order as PENDING payment.
      if (orderId) {
        try {
          // Our OrderService.updateOrder currently supports status updates.
          await this.orderService.updateOrder(orderId, { status: "PENDING" });
        } catch (err) {
          // don't fail the whole flow if updating order status fails — log and continue
          logger.error("Failed to mark order PENDING:", err);
        }
      }

      return {
        clientSecret: paymentIntent.client_secret ?? null,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error: any) {
      logger.error("Error creating payment intent:", error);
      throw error;
    }
  }

  /**
   * Confirm (or inspect) a payment by retrieving the PaymentIntent.
   * If succeeded, mark order as CONFIRMED.
   */
  async confirmPayment(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      const orderId = paymentIntent.metadata?.orderId;
      if (paymentIntent.status === "succeeded" && orderId) {
        try {
          await this.orderService.updateOrder(orderId, { status: "CONFIRMED" });
        } catch (err) {
          logger.error("Failed to update order status to CONFIRMED:", err);
        }
      }

      return paymentIntent;
    } catch (error: any) {
      logger.error("Error confirming payment:", error);
      throw new Error("Failed to confirm payment");
    }
  }

  /**
   * Handle incoming Stripe webhook payloads.
   * - body: raw request buffer (required for signature verification)
   * - signature: value of header 'stripe-signature'
   */
  async handleWebhook(body: Buffer, signature: string): Promise<{ received: boolean }> {
    try {
      const webhookSecret = config?.stripe?.webhookSecret || process.env.STRIPE_WEBHOOK_SECRET || "";
      let event: Stripe.Event;

      if (webhookSecret) {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret) as Stripe.Event;
      } else {
        // If no webhook secret is configured, attempt to parse JSON (unsafe for prod)
        event = JSON.parse(body.toString()) as Stripe.Event;
      }

      switch (event.type) {
        case "payment_intent.succeeded":
          await this.handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
          break;
        case "payment_intent.payment_failed":
          await this.handlePaymentFailure(event.data.object as Stripe.PaymentIntent);
          break;
        default:
          logger.info(`Unhandled Stripe event type: ${event.type}`);
      }

      return { received: true };
    } catch (error: any) {
      logger.error("Webhook error:", error);
      throw error;
    }
  }

  private async handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
    try {
      const orderId = paymentIntent.metadata?.orderId;
      if (!orderId) {
        logger.warn("Payment succeeded but no orderId in metadata", { paymentIntentId: paymentIntent.id });
        return;
      }

      try {
        await this.orderService.updateOrder(orderId, { status: "CONFIRMED" });
        logger.info(`Payment succeeded and order confirmed: ${orderId}`);
      } catch (err) {
        logger.error(`Failed to update order ${orderId} after successful payment:`, err);
      }
    } catch (err) {
      logger.error("Error in handlePaymentSuccess:", err);
    }
  }

  private async handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
    try {
      const orderId = paymentIntent.metadata?.orderId;
      if (!orderId) {
        logger.warn("Payment failed but no orderId in metadata", { paymentIntentId: paymentIntent.id });
        return;
      }

      try {
        await this.orderService.updateOrder(orderId, { status: "CANCELLED" });
        logger.info(`Payment failed and order cancelled: ${orderId}`);
      } catch (err) {
        logger.error(`Failed to update order ${orderId} after failed payment:`, err);
      }
    } catch (err) {
      logger.error("Error in handlePaymentFailure:", err);
    }
  }
}
