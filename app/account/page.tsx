"use client"

import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Package, LogOut } from "lucide-react"
import type { RootState } from "@/store"
import { logout } from "@/store/slices/authSlice"
import { clearCart } from "@/store/slices/cartSlice"

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  createdAt: string
  orderItems: Array<{
    id: string
    quantity: number
    priceSnapshot: number
    productTitle: string
    productImage?: string
    product: {
      title: string
      slug: string
      defaultImage: string
    }
  }>
}

export default function AccountPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isAuthenticated, user, accessToken } = useSelector((state: RootState) => state.auth)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setOrders(data.orders || [])
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [isAuthenticated, accessToken, router])

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearCart())
    router.push("/")
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Account Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Account</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>

                  <Separator />

                  <nav className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/account">
                        <Package className="h-4 w-4 mr-2" />
                        Order History
                      </Link>
                    </Button>
                  </nav>

                  <Separator />

                  <Button variant="outline" onClick={handleLogout} className="w-full justify-start bg-transparent">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Order History */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="border rounded-lg p-4 animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                          <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
                          <div className="h-16 bg-gray-200 rounded" />
                        </div>
                      ))}
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-gray-600 mb-6">When you place your first order, it will appear here.</p>
                      <Link href="/products">
                        <Button>Start Shopping</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                              <p className="text-sm text-gray-600">
                                Placed on{" "}
                                {new Date(order.createdAt).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                              <p className="font-semibold mt-1">${order.total.toFixed(2)}</p>
                            </div>
                          </div>

                          {/* Order Items Preview */}
                          <div className="space-y-3 mb-4">
                            {order.orderItems.slice(0, 2).map((item) => (
                              <div key={item.id} className="flex items-center space-x-3">
                                <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                  <Image
                                    src={item.productImage || item.product.defaultImage || "/placeholder.svg"}
                                    alt={item.productTitle || item.product.title}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">
                                    {item.productTitle || item.product.title}
                                  </p>
                                  <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-medium">${item.priceSnapshot.toFixed(2)}</p>
                              </div>
                            ))}
                            {order.orderItems.length > 2 && (
                              <p className="text-sm text-gray-600">
                                +{order.orderItems.length - 2} more item{order.orderItems.length - 2 !== 1 ? "s" : ""}
                              </p>
                            )}
                          </div>

                          <div className="flex space-x-3">
                            <Link href={`/orders/${order.id}`}>
                              <Button variant="outline" size="sm" className="bg-transparent">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
