import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../index"

const baseQuery = fetchBaseQuery({
  baseUrl: (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000") + "/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  },
})

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Product", "Category", "Cart", "Order", "User"],
  endpoints: (builder) => ({
    // Products
    getProducts: builder.query<
      {
        products: any[]
        pagination: {
          page: number
          limit: number
          total: number
          pages: number
        }
      },
      {
        categoryId?: string
        minPrice?: number
        maxPrice?: number
        search?: string
        sortBy?: string
        page?: number
        limit?: number
      }
    >({
      query: (params) => ({
        url: "/products",
        params,
      }),
      providesTags: ["Product"],
    }),
    getProductBySlug: builder.query<any, string>({
      query: (slug) => `/products/${slug}`,
      providesTags: ["Product"],
    }),
    // Categories
    getCategories: builder.query<any[], void>({
      query: () => "/categories",
      providesTags: ["Category"],
    }),
    // Cart
    getCart: builder.query<any, void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<any, { productId: string; quantity: number }>({
      query: (body) => ({
        url: "/cart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useGetCategoriesQuery,
  useGetCartQuery,
  useAddToCartMutation,
} = apiSlice
