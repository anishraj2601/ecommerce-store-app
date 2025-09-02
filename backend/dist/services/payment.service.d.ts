import Stripe from "stripe";
export declare class PaymentService {
    private orderService;
    createPaymentIntent(orderId: string, amount: number, currency?: string): Promise<{
        clientSecret: string | null;
        paymentIntentId: string;
    }>;
    confirmPayment(paymentIntentId: string): Promise<Stripe.PaymentIntent>;
    handleWebhook(body: Buffer, signature: string): Promise<{
        received: boolean;
    }>;
    private handlePaymentSuccess;
    private handlePaymentFailure;
}
//# sourceMappingURL=payment.service.d.ts.map