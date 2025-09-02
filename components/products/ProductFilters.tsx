"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface Category {
  id: string
  name: string
  slug: string
  children?: Category[]
}

interface ProductFiltersProps {
  categories: Category[]
  filters: any
  onFilterChange: (filters: any) => void
}

export function ProductFilters({ categories, filters, onFilterChange }: ProductFiltersProps) {
  const [localFilters, setLocalFilters] = useState({
    minPrice: filters.minPrice || "",
    maxPrice: filters.maxPrice || "",
  })

  const handleCategoryChange = (categoryId: string) => {
    onFilterChange({ categoryId: categoryId === filters.categoryId ? "" : categoryId })
  }

  const handlePriceChange = () => {
    onFilterChange({
      minPrice: localFilters.minPrice ? Number(localFilters.minPrice) : undefined,
      maxPrice: localFilters.maxPrice ? Number(localFilters.maxPrice) : undefined,
    })
  }

  const clearFilters = () => {
    setLocalFilters({ minPrice: "", maxPrice: "" })
    onFilterChange({
      categoryId: "",
      minPrice: undefined,
      maxPrice: undefined,
      search: "",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Filters</h3>
        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full bg-transparent">
          Clear All Filters
        </Button>
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id}>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={filters.categoryId === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{category.name}</span>
              </label>
              {category.children && category.children.length > 0 && (
                <div className="ml-6 mt-2 space-y-2">
                  {category.children.map((child) => (
                    <label key={child.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.categoryId === child.id}
                        onChange={() => handleCategoryChange(child.id)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-600">{child.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-3">
          <div>
            <Label htmlFor="minPrice" className="text-sm">
              Min Price
            </Label>
            <Input
              id="minPrice"
              type="number"
              placeholder="0"
              value={localFilters.minPrice}
              onChange={(e) => setLocalFilters({ ...localFilters, minPrice: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="maxPrice" className="text-sm">
              Max Price
            </Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="1000"
              value={localFilters.maxPrice}
              onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: e.target.value })}
              className="mt-1"
            />
          </div>
          <Button onClick={handlePriceChange} size="sm" className="w-full">
            Apply Price Filter
          </Button>
        </div>
      </div>
    </div>
  )
}
