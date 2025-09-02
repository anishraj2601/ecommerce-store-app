"use client";

import type React from "react";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RootState } from "@/store";
import { addToast } from "@/store/slices/uiSlice";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, total, itemCount } = useSelector(
    (state: RootState) => state.cart
  );
  const { isAuthenticated, user, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  const [isLoading, setIsLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
  });

  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);

  const subtotal = total;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + shipping + tax;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingAddress({
      ...billingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      dispatch(
        addToast({
          message: "Your cart is empty",
          type: "error",
        })
      );
      return;
    }

    if (!isAuthenticated) {
      dispatch(
        addToast({
          message: "Please sign in to continue",
          type: "error",
        })
      );
      router.push("/auth/login");
      return;
    }

    setIsLoading(true);

    try {
      // Create order
      const orderData = {
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        shippingAddress,
        billingAddress: sameAsShipping ? shippingAddress : billingAddress,
      };

      // const accessToken =
      //   typeof window !== "undefined"
      //     ? (window as any).store?.getState?.()?.auth?.accessToken
      //     : undefined;

      console.log("Auth status:", isAuthenticated, "AccessToken:", accessToken)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(
          addToast({
            message: "Order created! Redirecting to payment...",
            type: "success",
          })
        );
        router.push(
          `/checkout/payment?orderId=${
            data.order?.id ?? ""
          }&amount=${finalTotal}`
        );
      } else {
        dispatch(
          addToast({
            message: data.error || "Failed to place order",
            type: "error",
          })
        );
      }
    } catch (error) {
      dispatch(
        addToast({
          message: "Network error. Please try again.",
          type: "error",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">
              Add some items to your cart before checking out.
            </p>
            <Button onClick={() => router.push("/products")}>
              Continue Shopping
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Checkout Form */}
              <div className="space-y-6">
                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={shippingAddress.firstName}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={shippingAddress.lastName}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={shippingAddress.email}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={handleShippingChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="addressLine1">Address Line 1</Label>
                      <Input
                        id="addressLine1"
                        name="addressLine1"
                        value={shippingAddress.addressLine1}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="addressLine2">
                        Address Line 2 (Optional)
                      </Label>
                      <Input
                        id="addressLine2"
                        name="addressLine2"
                        value={shippingAddress.addressLine2}
                        onChange={handleShippingChange}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={shippingAddress.city}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={shippingAddress.state}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={shippingAddress.postalCode}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <select
                          id="country"
                          name="country"
                          value={shippingAddress.country}
                          onChange={(e) =>
                            setShippingAddress({
                              ...shippingAddress,
                              country: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          required
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={sameAsShipping}
                          onChange={(e) => setSameAsShipping(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">
                          Same as shipping address
                        </span>
                      </label>
                    </div>

                    {!sameAsShipping && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="billingFirstName">First Name</Label>
                            <Input
                              id="billingFirstName"
                              name="firstName"
                              value={billingAddress.firstName}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="billingLastName">Last Name</Label>
                            <Input
                              id="billingLastName"
                              name="lastName"
                              value={billingAddress.lastName}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="billingAddressLine1">
                            Address Line 1
                          </Label>
                          <Input
                            id="billingAddressLine1"
                            name="addressLine1"
                            value={billingAddress.addressLine1}
                            onChange={handleBillingChange}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="billingAddressLine2">
                            Address Line 2 (Optional)
                          </Label>
                          <Input
                            id="billingAddressLine2"
                            name="addressLine2"
                            value={billingAddress.addressLine2}
                            onChange={handleBillingChange}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="billingCity">City</Label>
                            <Input
                              id="billingCity"
                              name="city"
                              value={billingAddress.city}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="billingState">State</Label>
                            <Input
                              id="billingState"
                              name="state"
                              value={billingAddress.state}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="billingPostalCode">
                              Postal Code
                            </Label>
                            <Input
                              id="billingPostalCode"
                              name="postalCode"
                              value={billingAddress.postalCode}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="billingCountry">Country</Label>
                            <select
                              id="billingCountry"
                              name="country"
                              value={billingAddress.country}
                              onChange={(e) =>
                                setBillingAddress({
                                  ...billingAddress,
                                  country: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                              required
                            >
                              <option value="US">United States</option>
                              <option value="CA">Canada</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {items.map((item: any) => (
                        <div
                          key={item.id ?? item.productId}
                          className="flex space-x-3"
                        >
                          <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {item.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-sm font-medium">
                            $
                            {(
                              (item.salePrice ?? item.price) * item.quantity
                            ).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Totals */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal ({itemCount} items)</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>
                          {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Creating Order..."
                        : `Continue to Payment - $${finalTotal.toFixed(2)}`}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      By placing your order, you agree to our Terms of Service
                      and Privacy Policy.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
