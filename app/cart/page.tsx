"use client"

import { useSelector, useDispatch } from "react-redux"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { RootState } from "@/store"
import { removeItem, updateQuantity, clearCart } from "@/store/slices/cartSlice"

export default function CartPage() {
  const dispatch = useDispatch()
  const { items, total, itemCount } = useSelector((state: RootState) => state.cart)

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeItem(itemId))
  }

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId)
    } else {
      dispatch(updateQuantity({ id: itemId, quantity }))
    }
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const subtotal = total
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const finalTotal = subtotal + shipping + tax

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Link href="/products">
                <Button size="lg">Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    Cart Items ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </h2>
                  <Button variant="outline" size="sm" onClick={handleClearCart} className="text-red-600 bg-transparent">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex space-x-4 p-4 border rounded-lg">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <Link href={`/products/${item.slug}`} className="hover:underline">
                          <h3 className="font-medium text-lg">{item.title}</h3>
                        </Link>

                        <div className="flex items-center space-x-2 mt-2">
                          <span className="font-semibold">${(item.salePrice || item.price).toFixed(2)}</span>
                          {item.salePrice && item.salePrice < item.price && (
                            <span className="text-gray-500 line-through">${item.price.toFixed(2)}</span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium w-12 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Item Total & Remove */}
                          <div className="flex items-center space-x-4">
                            <span className="font-semibold">
                              ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {subtotal < 100 && (
                    <p className="text-sm text-gray-600 mt-3">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}

                  <Link href="/checkout" className="block mt-6">
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Link href="/products" className="block mt-3">
                    <Button variant="outline" className="w-full bg-transparent">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
