import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl?: string | null
  quantity: number
}

interface CartState {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  totalItems: () => number
}

// 1. Agregamos el par de paréntesis vacíos después del tipo <CartState>()
// 2. Envolvemos todo dentro de persist()
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
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

      increaseQuantity: (id) => {
        set((state) => ({
          items: state.items.map(item => 
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          )
        }))
      },

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
    }),
    {
      // 3. Este es el nombre con el que se guardará en la memoria del navegador
      name: 'undrstnd-cart',
    }
  )
)