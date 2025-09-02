"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RootState } from "@/store";
import { toast } from "sonner";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.error(
    "Stripe publishable key is not set. Please check your .env.local file."
  );
}

const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : null;

function PaymentForm({ orderId, amount }: { orderId: string; amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create payment intent
    const createPaymentIntent = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/payments/create-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ orderId, amount }),
          }
        );

        const data = await response.json();
        if (data.success) {
          setClientSecret(data.data.clientSecret);
        } else {
          toast.error(data.error || "Failed to initialize payment");
        }
      } catch (error) {
        toast.error("Failed to initialize payment");
      }
    };

    createPaymentIntent();
  }, [orderId, amount, accessToken]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      toast.error(error.message || "Payment failed");
      setIsProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      toast.success("Payment successful!");
      router.push(`/orders/${orderId}?payment=success`);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 border rounded-lg">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                },
              }}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">
              Total: ${amount.toFixed(2)}
            </span>
          </div>

          <Button
            type="submit"
            disabled={!stripe || isProcessing}
            className="w-full"
          >
            {isProcessing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const amount = Number.parseFloat(searchParams.get("amount") || "0");

  if (!orderId || !amount) {
    return <div>Invalid payment parameters</div>;
  }

  if (!stripePromise) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Configuration Error</h1>
        <p className="text-gray-600">
          Stripe has not been configured correctly. Please ensure the
          NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is set.
        </p>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <Elements stripe={stripePromise}>
        <PaymentForm orderId={orderId} amount={amount} />
      </Elements>
    </div>
  );
}
