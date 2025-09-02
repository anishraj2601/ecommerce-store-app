import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface CartItem {
  id: string
  productId: string
  title: string
  price: number
  salePrice?: number
  quantity: number
  image: string
  slug: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.productId === action.payload.productId)

      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }

      cartSlice.caseReducers.calculateTotals(state)
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      cartSlice.caseReducers.calculateTotals(state)
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
      cartSlice.caseReducers.calculateTotals(state)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload
      cartSlice.caseReducers.calculateTotals(state)
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    closeCart: (state) => {
      state.isOpen = false
    },
    calculateTotals: (state) => {
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0)
      state.total = state.items.reduce((total, item) => {
        const price = item.salePrice || item.price
        return total + price * item.quantity
      }, 0)
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart, setCartItems, toggleCart, closeCart } = cartSlice.actions
export default cartSlice.reducer
