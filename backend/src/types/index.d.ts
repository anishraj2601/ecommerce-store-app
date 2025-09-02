export interface CreateUserDTO {
  email: string
  password: string
  name?: string
}

export interface LoginDTO {
  email: string
  password: string
}

export interface CreateProductDTO {
  title: string
  slug: string
  description?: string
  price: number
  salePrice?: number
  sku: string
  inventory: number
  categoryId: string
  images: string[]
  defaultImage?: string
  attributes: Record<string, any>
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}

export interface CreateCategoryDTO {
  name: string
  slug: string
  parentId?: string
}

export interface AddToCartDTO {
  productId: string
  quantity: number
}

export interface CreateOrderDTO {
  items: Array<{
    productId: string
    quantity: number
  }>
  shippingAddress: {
    firstName: string
    lastName: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
    phone?: string
  }
  billingAddress?: {
    firstName: string
    lastName: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
    phone?: string
  }
}

export interface ProductFilters {
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  sortBy?: "price_asc" | "price_desc" | "name_asc" | "name_desc" | "created_desc"
  page?: number
  limit?: number
}
