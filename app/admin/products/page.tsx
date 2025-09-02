"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2 } from "lucide-react"

interface Product {
  id: string
  title: string
  price: number
  salePrice?: number
  stock: number
  category: string
  status: "ACTIVE" | "INACTIVE"
  image?: string
  createdAt: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Mock data for now - replace with actual API call
        setProducts([
          {
            id: "1",
            title: "Classic White T-Shirt",
            price: 29.99,
            salePrice: 24.99,
            stock: 150,
            category: "T-Shirts",
            status: "ACTIVE",
            image: "/placeholder.svg?height=60&width=60",
            createdAt: "2024-01-15",
          },
          {
            id: "2",
            title: "Denim Jeans",
            price: 79.99,
            stock: 75,
            category: "Jeans",
            status: "ACTIVE",
            image: "/placeholder.svg?height=60&width=60",
            createdAt: "2024-01-14",
          },
          {
            id: "3",
            title: "Summer Dress",
            price: 59.99,
            stock: 0,
            category: "Dresses",
            status: "INACTIVE",
            image: "/placeholder.svg?height=60&width=60",
            createdAt: "2024-01-13",
          },
        ])
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      // Implement delete functionality
      setProducts(products.filter((p) => p.id !== productId))
    }
  }

  if (isLoading) {
    return <div>Loading products...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{product.title}</p>
                        <p className="text-sm text-gray-600">ID: {product.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <div>
                      {product.salePrice ? (
                        <>
                          <span className="font-medium">${product.salePrice}</span>
                          <span className="ml-2 text-sm text-gray-500 line-through">${product.price}</span>
                        </>
                      ) : (
                        <span className="font-medium">${product.price}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={product.stock === 0 ? "text-red-600" : ""}>{product.stock}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.status === "ACTIVE" ? "default" : "secondary"}>{product.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
