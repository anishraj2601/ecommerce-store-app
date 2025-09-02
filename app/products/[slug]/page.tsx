"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, ShoppingBag } from "lucide-react"
import { useGetProductBySlugQuery } from "@/store/api/apiSlice"
import { addItem } from "@/store/slices/cartSlice"
import { addToast } from "@/store/slices/uiSlice"

export default function ProductDetailPage() {
  const params = useParams()
  const dispatch = useDispatch()
  const slug = params.slug as string
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const { data: product, isLoading, error } = useGetProductBySlugQuery(slug)

  const handleAddToCart = () => {
    if (!product) return

    dispatch(
      addItem({
        id: `cart-${product.id}`,
        productId: product.id,
        title: product.title,
        price: product.price,
        salePrice: product.salePrice,
        quantity,
        image: product.defaultImage,
        slug: product.slug,
      }),
    )

    dispatch(
      addToast({
        message: `${product.title} added to cart`,
        type: "success",
      }),
    )
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
              <div className="h-20 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const currentPrice = Number(product.salePrice ?? product.price)
  const hasDiscount = product.salePrice && Number(product.salePrice) < Number(product.price)
  const images = product.images || [product.defaultImage]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
                {hasDiscount && <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">Sale</Badge>}
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 relative rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? "border-black" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category */}
              <p className="text-sm text-gray-500 uppercase tracking-wide">{product.category.name}</p>

              {/* Title */}
              <h1 className="text-3xl font-bold">{product.title}</h1>

              {/* Price */}
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold">${currentPrice.toFixed(2)}</span>
                {hasDiscount && (
                  <span className="text-lg text-gray-500 line-through">
                    ${Number(product.price).toFixed(2)}
                  </span>
                )}
              </div>

              <Separator />

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Attributes */}
              {product.attributes && Object.keys(product.attributes).length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">Details</h3>
                  <div className="space-y-2">
                    {Object.entries(product.attributes).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">{key}:</span>
                        <span>{Array.isArray(value) ? value.join(", ") : String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm" onClick={decrementQuantity} disabled={quantity <= 1}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button variant="outline" size="sm" onClick={incrementQuantity}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button onClick={handleAddToCart} size="lg" className="w-full">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart - ${(currentPrice * quantity).toFixed(2)}
                </Button>
              </div>

              {/* Stock Status */}
              <div className="text-sm text-gray-600">
                {product.inventory > 0 ? (
                  <span className="text-green-600">✓ In Stock ({product.inventory} available)</span>
                ) : (
                  <span className="text-red-600">✗ Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
