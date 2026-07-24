'use client'

import { useCartStore, CartItem } from '@/store/cartStore'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'

export default function CheckoutPage() {
  const [isMounted, setIsMounted] = useState(false)

  const cart = useCartStore((state) => state.items)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const total = cart.reduce((acc: number, item: CartItem) => acc + (item.price * item.quantity), 0)

  const handleWhatsApp = () => {
    const phone = "573126030082" 

    let message = "Hola, me gustaría confirmar el siguiente pedido:\n\n"

    cart.forEach((item: CartItem) => {
      const subtotal = item.price * item.quantity
      message += `- ${item.name} (x${item.quantity}) : $${subtotal.toLocaleString('es-CO')}\n`
    })

    message += `\n*Total a Pagar: $${total.toLocaleString('es-CO')}*`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>

      {cart.length === 0 ? (
        <div>
          <p className="mb-4 text-zinc-400">Tu carrito está vacío.</p>
          <Link href="/" className="text-green-500 font-semibold hover:underline">
            Volver a la tienda
          </Link>
        </div>
      ) : (
        <div className="bg-zinc-900 p-4 sm:p-6 rounded-lg border border-zinc-800">
          <ul className="divide-y divide-zinc-800 mb-6">
            {cart.map((item: CartItem) => (
              <li key={item.id} className="py-6 grid grid-cols-1 sm:grid-cols-[1fr_auto_120px] items-center gap-4">
                
                {/* 1. Foto y Nombre */}
                <div className="flex items-center gap-4 min-w-0">
                  {item.imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-md bg-zinc-800 shrink-0" 
                    />
                  ) : (
                    <div className="w-16 h-16 bg-zinc-800 rounded-md flex items-center justify-center text-xs text-zinc-500 shrink-0">
                      Sin foto
                    </div>
                  )}
                  <span className="font-semibold truncate" title={item.name}>
                    {item.name}
                  </span>
                </div>

                {/* 2. Controles de cantidad */}
                <div className="flex items-center justify-center justify-self-start sm:justify-self-center">
                  <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-md px-2 py-1">
                    <button 
                      onClick={() => decreaseQuantity(item.id)} 
                      className="text-xl px-2 text-zinc-400 hover:text-white transition-colors flex items-center justify-center min-w-6"
                      title={item.quantity === 1 ? "Eliminar producto" : "Restar cantidad"}
                    >
                      {item.quantity === 1 ? (
                        <Trash2 className="w-4 h-4 text-red-500 hover:text-red-400 transition-colors" />
                      ) : (
                        "-"
                      )}
                    </button>

                    <span className="font-medium w-4 text-center select-none">
                      {item.quantity}
                    </span>

                    <button 
                      onClick={() => increaseQuantity(item.id)} 
                      className="text-xl px-2 text-zinc-400 hover:text-white transition-colors"
                      title="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 3. Precio total por ítem */}
                <span className="font-bold text-right justify-self-end w-full">
                  ${(item.price * item.quantity).toLocaleString('es-CO')}
                </span>

              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center text-xl font-bold mb-8 border-t border-zinc-800 pt-6">
            <span>Total:</span>
            <span>${total.toLocaleString('es-CO')}</span>
          </div>

          <button 
            onClick={handleWhatsApp}
            className="w-full bg-green-500 text-white py-3 rounded-md font-bold hover:bg-green-600 transition-transform active:scale-[0.98]"
          >
            Confirmar pedido por WhatsApp
          </button>
        </div>
      )}
    </div>
  )
}