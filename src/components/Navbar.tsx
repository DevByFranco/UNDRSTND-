'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { logout } from '@/app/admin/actions'
import { useEffect, useState } from 'react'

interface StoreState {
  cart?: { quantity: number }[]
  items?: { quantity: number }[]
}

export default function Navbar() {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  
  const cart = useCartStore((state: StoreState) => state.cart || state.items || [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
  }, [])

  const totalItems = cart.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0)

  // Verificamos en qué ruta se encuentra el usuario
  const isAdminPage = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/login'

  return (
    <nav className="flex items-center justify-between p-4 bg-zinc-900 text-white">
      <Link href="/" className="text-xl font-bold uppercase tracking-wider">Undrstnd</Link>
      <div className="flex gap-4 items-center">
        <Link href="/" className="hover:text-gray-300">Inicio</Link>
        
        {/* Si estamos en /admin, mostramos Cerrar Sesión en la barra */}
        {isAdminPage ? (
          <form action={logout}>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-1.5 rounded-md transition-colors"
            >
              Cerrar Sesión
            </button>
          </form>
        ) : !isLoginPage && isMounted ? (
          /* En cualquier otra página (tienda/carrito) mostramos el Carrito */
          <Link 
            href="/carrito" 
            className="bg-white text-black px-4 py-1 rounded-md text-sm font-semibold hover:bg-gray-200 transition"
          >
            Carrito ({totalItems})
          </Link>
        ) : null}
      </div>
    </nav>
  )
}