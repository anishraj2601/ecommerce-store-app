"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ProductGrid } from "@/components/products/ProductGrid"
import { ProductFilters } from "@/components/products/ProductFilters"
import { Button } from "@/components/ui/button"
import { useGetProductsQuery, useGetCategoriesQuery } from "@/store/api/apiSlice"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    categoryId: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "created_desc",
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    limit: 12,
  })

  const { data: productsData, isLoading: productsLoading } = useGetProductsQuery(filters)
  const { data: categories } = useGetCategoriesQuery()

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters, page: 1 })
  }

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <ProductFilters categories={categories || []} filters={filters} onFilterChange={handleFilterChange} />
            </aside>

            {/* Products */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">Products</h1>
                  {productsData && (
                    <p className="text-gray-600 mt-1">
                      Showing {productsData.products.length} of {productsData.pagination.total} products
                    </p>
                  )}
                </div>

                {/* Sort Dropdown */}
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="created_desc">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                  <option value="name_desc">Name: Z to A</option>
                </select>
              </div>

              {/* Product Grid */}
              <ProductGrid products={productsData?.products || []} loading={productsLoading} />

              {/* Pagination */}
              {productsData && productsData.pagination.pages > 1 && (
                <div className="flex justify-center mt-12 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(filters.page - 1)}
                    disabled={filters.page === 1}
                  >
                    Previous
                  </Button>

                  {Array.from({ length: productsData.pagination.pages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === filters.page ? "default" : "outline"}
                      onClick={() => handlePageChange(page)}
                      className="w-10"
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(filters.page + 1)}
                    disabled={filters.page === productsData.pagination.pages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
