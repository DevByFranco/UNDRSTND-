// 1. Nuestros datos de prueba (Mock Data)
const mockProducts = [
  {
    id: 1,
    name: "Camiseta Oversize UNDRSTND",
    price: 45000,
    image: "https://via.placeholder.com/400x500/111111/ffffff?text=Camiseta",
  },
  {
    id: 2,
    name: "Gorra Minimalista Básica",
    price: 25000,
    image: "https://via.placeholder.com/400x500/111111/ffffff?text=Gorra",
  },
  {
    id: 3,
    name: "Hoodie Heavyweight Negro",
    price: 85000,
    image: "https://via.placeholder.com/400x500/111111/ffffff?text=Hoodie",
  },
  {
    id: 4,
    name: "Pantalón Cargo Urbano",
    price: 95000,
    image: "https://via.placeholder.com/400x500/111111/ffffff?text=Cargo",
  }
];

export default function Home() {
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
          
          {/* El método .map() itera sobre nuestra lista de productos y dibuja una tarjeta por cada uno */}
          {mockProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              
              {/* Contenedor de la imagen con proporción 4:5 (típica de ropa) */}
              <div className="aspect-4/5 bg-zinc-900 rounded-lg overflow-hidden mb-4 border border-zinc-800">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Información del producto */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-zinc-400">${product.price.toLocaleString('es-CO')}</p>
                </div>
                <button className="bg-white text-black px-3 py-1 rounded-md text-sm font-bold hover:bg-zinc-200 transition-colors">
                  Añadir
                </button>
              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}