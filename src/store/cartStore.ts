import { create } from 'zustand'

// Definimos la estructura de un producto en el carrito
export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl?: string | null
  quantity: number
}

// Definimos las acciones que puede hacer nuestra tienda
interface CartState {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  totalItems: () => number
}

// Creamos la memoria global
export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addToCart: (product) => {
    set((state) => {
      // Revisamos si el producto ya está en el carrito
      const existingItem = state.items.find(item => item.id === product.id)
      
      if (existingItem) {
        // Si existe, le sumamos 1 a la cantidad
        return {
          items: state.items.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        }
      }
      // Si no existe, lo agregamos con cantidad 1
      return { items: [...state.items, { ...product, quantity: 1 }] }
    })
  },

  // Función para contar cuántas cosas hay en total
  totalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  }
}))