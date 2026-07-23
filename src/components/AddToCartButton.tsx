'use client'

import { useCartStore } from '@/store/cartStore'

// 1. Le decimos a TypeScript exactamente qué datos trae el producto
type ProductProps = {
  id: string
  name: string
  price: number
  image_url?: string | null
}

// 2. Usamos ProductProps en lugar de 'any'
export default function AddToCartButton({ product }: { product: ProductProps }) {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <button
      onClick={() => addToCart({ 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        imageUrl: product.image_url 
      })}
      className="bg-white text-black px-3 py-1 rounded-md text-sm font-bold hover:bg-zinc-200 transition-colors"
    >
      Añadir
    </button>
  )
}