import { createClient } from '@/lib/supabase'
import Image from 'next/image'
import AddToCartButton from '@/components/AddToCartButton'

export const dynamic = 'force-dynamic'

export default async function Home() {
  // 1. Conectamos con Supabase
  const supabase = await createClient()
  
  // 2. Traemos todos los productos reales de tu base de datos
  const { data: Product } = await supabase.from('Product').select('*')

  return (
    // Aplicamos el fondo negro a toda la página para ese estilo streetwear
    <div className="min-h-screen bg-black text-white">
      
      {/* SECCIÓN HERO: Un banner principal llamativo */}
      <section className="py-20 text-center px-4 border-b border-zinc-800">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
          ENTIENDE EL ESTILO.
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
          Streetwear minimalista para los que saben. Colección exclusiva.
        </p>
      </section>

      {/* SECCIÓN VITRINA: Cuadrícula de productos */}
      <section className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold">Nuevos Lanzamientos</h2>
        </div>

        {/* CSS Grid adaptativo: 1 columna en celulares, hasta 4 en monitores grandes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          
          {/* Iteramos sobre los productos REALES que trajimos de Supabase */}
          {Product?.map((product, index) => (
            <div 
              key={product.id} 
              className="group bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex flex-col justify-between hover:border-zinc-700 transition-all"
            >
              {/* Contenedor superior: Imagen + Texto */}
              <div>
                {/* Contenedor de la imagen con proporción 4:5 */}
                <div className="aspect-4/5 bg-zinc-950 rounded-md overflow-hidden mb-4 relative">
                  <Image 
                    src={product.image_url || `https://via.placeholder.com/400x500/111111/ffffff?text=${product.name.split(' ')[0]}`} 
                    alt={product.name}
                    fill // Le dice a la imagen que llene todo el contenedor
                    unoptimized // Evita errores de configuración con enlaces externos
                    priority={index === 0} // Carga rápida de la primera imagen
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Información del producto (Estructura vertical) */}
                <div className="mb-4">
                  <h3 className="font-bold text-white text-lg leading-tight mb-1">
                    {product.name}
                  </h3>
                  <p className="text-zinc-300 font-semibold text-sm mb-2">
                    ${product.price ? product.price.toLocaleString('es-CO') : 0}
                  </p>
                  {product.description && (
                    <p className="text-zinc-500 text-sm line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Botón fijado abajo ocupando todo el ancho */}
              <div className="w-full">
                <AddToCartButton product={product} />
              </div>
            </div>
          ))}

        </div>

        {/* Mensaje de respaldo por si borras los productos de la BD accidentalmente */}
        {(!Product || Product.length === 0) && (
          <p className="text-zinc-500 text-center mt-12 py-10">No hay productos disponibles por ahora.</p>
        )}
      </section>
    </div>
  )
}