import prisma from '@/lib/prisma'
import { createProduct, deleteProduct } from './actions'

export default async function AdminPage() {
  // Traemos los productos directamente de la base de datos de Supabase
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }, // Los más recientes primero
  })

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Agregar Nuevo Producto</h2>
          
          {/* Conectamos la Server Action en el atributo 'action' */}
          <form action={createProduct} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre del producto</label>
              <input 
                name="name"
                type="text" 
                required
                className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded-md text-white focus:outline-none focus:border-white" 
                placeholder="Ej: Camiseta Oversize Negra" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Precio ($)</label>
              <input 
                name="price"
                type="number" 
                step="0.01"
                required
                className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded-md text-white focus:outline-none focus:border-white" 
                placeholder="Ej: 35000" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descripción (Opcional)</label>
              <textarea 
                name="description"
                rows={3}
                className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded-md text-white focus:outline-none focus:border-white" 
                placeholder="Ej: Algodón 100% peso pesado" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Archivo de la Imagen</label>
              <input 
              type="file" 
              name="image" 
              accept="image/*" // Solo permite seleccionar imágenes
                className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded-md text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-zinc-200 cursor-pointer"
              required
            />
            </div>

            <button 
              type="submit" 
              className="bg-white text-black font-bold py-2 rounded-md mt-4 hover:bg-gray-200 transition-colors"
            >
              Guardar Producto
            </button>
          </form>
        </div>

        {/* COLUMNA DERECHA: Tabla con Datos Reales */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Productos Existentes ({products.length})</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="py-3 px-2 font-medium">Nombre</th>
                  <th className="py-3 px-2 font-medium">Precio</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    {/* Cambiamos colSpan a 3 porque ahora hay 3 columnas */}
                    <td colSpan={3} className="py-4 text-center text-zinc-500">
                      No hay productos registrados aún.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                      <td className="py-4 px-2 font-medium">{product.name}</td>
                      <td className="py-4 px-2">${product.price.toLocaleString('es-CO')}</td>
                      <td className="py-4 px-2 text-right">
                        <form action={deleteProduct}>
                          <input type="hidden" name="id" value={product.id} />
                          <button 
                            type="submit" 
                            className="text-red-500 text-sm hover:text-red-400 font-semibold"
                          >
                            Eliminar
                          </button>
                        </form>
                      </td>
                    </tr> 
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}