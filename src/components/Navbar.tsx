'use client'

import Link from "next/link";
import { useCartStore } from '@/store/cartStore'
import { useEffect, useState } from 'react'

// 1. Creamos esta interfaz en lugar de usar 'any'
interface StoreState {
  cart?: { quantity: number }[];
  items?: { quantity: number }[];
}

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false)
  
  const cart = useCartStore((state: StoreState) => state.cart || state.items || [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
  }, [])

  const totalItems = cart.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0)

  return (
    <nav className="flex items-center justify-between p-4 bg-zinc-900 text-white">
      <Link href="/" className="text-xl font-bold uppercase tracking-wider">Undrstnd</Link>
      <div className="flex gap-4 items-center">
        <Link href="/" className="hover:text-gray-300">Inicio</Link>
        
        <Link 
          href="/carrito" 
          className="bg-white text-black px-4 py-1 rounded-md text-sm font-semibold hover:bg-gray-200 transition"
        >
          Carrito ({isMounted ? totalItems : 0})
        </Link>
      </div>
    </nav>
  );
}