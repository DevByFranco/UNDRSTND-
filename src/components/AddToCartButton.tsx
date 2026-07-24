'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'

// 1. Le decimos a TypeScript exactamente qué datos trae el producto
type ProductProps = {
  id: string
  name: string
  price: number
  image_url?: string | null
}

export default function AddToCartButton({ product }: { product: ProductProps }) {
  const addToCart = useCartStore((state) => state.addToCart)
  
  // NUEVO: Estado para saber si acabamos de hacer clic
  const [isAdded, setIsAdded] = useState(false)

  // NUEVO: Función que hace las dos cosas (guardar y animar)
  const handleAdd = () => {
    // A. Guardamos en Zustand (tu código original)
    addToCart({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      imageUrl: product.image_url 
    })

    // B. Activamos el modo "Añadido"
    setIsAdded(true)

    // C. Apagamos el modo "Añadido" después de 1.5 segundos
    setTimeout(() => {
      setIsAdded(false)
    }, 1500)
  }

  return (
    <button
      onClick={handleAdd}
      // Si está en medio de la animación, deshabilitamos el botón temporalmente
      disabled={isAdded}
      // Clases dinámicas de Tailwind con animación de toque y cambio de color esmeralda
      className={`w-full py-2.5 rounded-md text-sm font-bold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 ${
        isAdded
          ? 'bg-emerald-500 text-white scale-[1.02] shadow-lg shadow-emerald-500/20'
          : 'bg-white text-black hover:bg-zinc-200'
      }`}
    >
      {/* El texto y el ícono rebotan dinámicamente */}
      {isAdded ? (
        <>
          <span className="animate-bounce">✓</span>
          <span>¡Añadido!</span>
        </>
      ) : (
        'Añadir al carrito'
      )}
    </button>
  )
}