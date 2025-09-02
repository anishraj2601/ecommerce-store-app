"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { addItem } from "@/store/slices/cartSlice"
import { addToast } from "@/store/slices/uiSlice"

interface Product {
  id: string
  title: string
  slug: string
  price: number
  salePrice?: number
  defaultImage: string
  category: {
    name: string
  }
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    dispatch(
      addItem({
        id: `cart-${product.id}`,
        productId: product.id,
        title: product.title,
        price: product.price,
        salePrice: product.salePrice,
        quantity: 1,
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

  const currentPrice = Number(product.salePrice ?? product.price)
  const hasDiscount = product.salePrice && Number(product.salePrice) < Number(product.price)

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="space-y-3">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg">
          <Image
            src={product.defaultImage || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {hasDiscount && <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Sale</Badge>}

          {/* Quick Add Button - Shows on hover */}
          <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-white text-black hover:bg-gray-100 border border-gray-200"
              size="sm"
            >
              Quick Add
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <p className="text-xs text-gray-500 uppercase tracking-wide">{product.category.name}</p>
          <h3 className="font-medium text-sm leading-tight group-hover:text-gray-600 transition-colors">
            {product.title}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-sm">${currentPrice.toFixed(2)}</span>
            {hasDiscount && <span className="text-xs text-gray-500 line-through">${Number(product.price).toFixed(2)}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}
