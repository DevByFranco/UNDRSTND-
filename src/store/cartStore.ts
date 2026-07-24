import { create } from 'zustand'

export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl?: string | null
  quantity: number
}

// 1. Agregamos las nuevas funciones a la interfaz
interface CartState {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  totalItems: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addToCart: (product) => {
    set((state) => {
      const existingItem = state.items.find(item => item.id === product.id)
      
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        }
      }
      return { items: [...state.items, { ...product, quantity: 1 }] }
    })
  },

  // 2. Función para sumar cantidad
  increaseQuantity: (id) => {
    set((state) => ({
      items: state.items.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    }))
  },

  // 3. Función para restar cantidad (y si llega a 0, se filtra/elimina)
  decreaseQuantity: (id) => {
    set((state) => ({
      items: state.items.map(item => 
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      ).filter(item => item.quantity > 0)
    }))
  },

  totalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  }
}))