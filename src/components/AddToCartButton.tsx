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

    // C. Apagamos el modo "Añadido" después de 2 segundos (2000 milisegundos)
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  return (
    <button
      // Cambiamos el onClick para que llame a nuestra nueva función
      onClick={handleAdd}
      // Si está en medio de la animación, deshabilitamos el botón temporalmente
      disabled={isAdded}
      // Hacemos que las clases de Tailwind sean dinámicas dependiendo del estado
      className={`px-3 py-1 rounded-md text-sm font-bold transition-all duration-300 ${
        isAdded 
          ? 'bg-green-500 text-white scale-105' // Estilo cuando se añade (Verde y un poco más grande)
          : 'bg-white text-black hover:bg-zinc-200' // Tu estilo original
      }`}
    >
      {/* El texto también cambia dinámicamente */}
      {isAdded ? '¡Añadido! ✓' : 'Añadir'}
    </button>
  )
}