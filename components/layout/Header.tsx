"use client"

import Link from "next/link"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Search, ShoppingBag, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CartDrawer } from "@/components/cart/CartDrawer"
import type { RootState } from "@/store"
import { toggleCart } from "@/store/slices/cartSlice"
import { toggleMobileMenu, closeMobileMenu } from "@/store/slices/uiSlice"

export function Header() {
  const dispatch = useDispatch()
  const { itemCount } = useSelector((state: RootState) => state.cart)
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { mobileMenuOpen } = useSelector((state: RootState) => state.ui)
  const [searchQuery, setSearchQuery] = useState("")

  const handleCartClick = () => {
    dispatch(toggleCart())
  }

  const handleMobileMenuToggle = () => {
    dispatch(toggleMobileMenu())
  }

  const closeMobileMenuHandler = () => {
    dispatch(closeMobileMenu())
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight">STORE</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/products" className="text-sm font-medium hover:text-gray-600 transition-colors">
                All Products
              </Link>
              <Link href="/products?category=men" className="text-sm font-medium hover:text-gray-600 transition-colors">
                Men
              </Link>
              <Link
                href="/products?category=women"
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                Women
              </Link>
              <Link
                href="/products?category=kids"
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                Kids
              </Link>
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-gray-200 focus:border-gray-400 focus:ring-0"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* User Account */}
              <Link href={isAuthenticated ? "/account" : "/auth/login"}>
                <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{isAuthenticated ? user?.name || "Account" : "Sign In"}</span>
                </Button>
              </Link>

              {/* Cart */}
              <Button variant="ghost" size="sm" onClick={handleCartClick} className="relative">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu Toggle */}
              <Button variant="ghost" size="sm" onClick={handleMobileMenuToggle} className="md:hidden">
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-gray-200 focus:border-gray-400 focus:ring-0"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <Link
                href="/products"
                className="block text-sm font-medium hover:text-gray-600 transition-colors"
                onClick={closeMobileMenuHandler}
              >
                All Products
              </Link>
              <Link
                href="/products?category=men"
                className="block text-sm font-medium hover:text-gray-600 transition-colors"
                onClick={closeMobileMenuHandler}
              >
                Men
              </Link>
              <Link
                href="/products?category=women"
                className="block text-sm font-medium hover:text-gray-600 transition-colors"
                onClick={closeMobileMenuHandler}
              >
                Women
              </Link>
              <Link
                href="/products?category=kids"
                className="block text-sm font-medium hover:text-gray-600 transition-colors"
                onClick={closeMobileMenuHandler}
              >
                Kids
              </Link>
              <hr className="my-4" />
              <Link
                href={isAuthenticated ? "/account" : "/auth/login"}
                className="flex items-center space-x-2 text-sm font-medium hover:text-gray-600 transition-colors"
                onClick={closeMobileMenuHandler}
              >
                <User className="h-4 w-4" />
                <span>{isAuthenticated ? user?.name || "Account" : "Sign In"}</span>
              </Link>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  )
}
