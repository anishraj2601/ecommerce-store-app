"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ProductGrid } from "@/components/products/ProductGrid"
import { useGetProductsQuery } from "@/store/api/apiSlice"

export default function HomePage() {
  const { data: productsData, isLoading } = useGetProductsQuery({ limit: 8 })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Modern Fashion</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover our curated collection of premium fashion and lifestyle products designed for the modern
              individual.
            </p>
            <Link href="/products">
              <Button size="lg" className="px-8">
                Shop Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
              <p className="text-gray-600">Handpicked favorites from our latest collection</p>
            </div>

            <ProductGrid products={productsData?.products || []} loading={isLoading} />

            <div className="text-center mt-12">
              <Link href="/products">
                <Button variant="outline" size="lg">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="/products?category=men" className="group">
                <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">Men</h3>
                  </div>
                </div>
              </Link>

              <Link href="/products?category=women" className="group">
                <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">Women</h3>
                  </div>
                </div>
              </Link>

              <Link href="/products?category=kids" className="group">
                <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">Kids</h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
