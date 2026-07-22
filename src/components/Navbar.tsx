import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-zinc-900 text-white">
      <Link href="/" className="text-xl font-bold uppercase tracking-wider">Undrstnd</Link>
      <div className="flex gap-4">
        <Link href="/" className="hover:text-gray-300">Inicio</Link>
        <button className="bg-white text-black px-4 py-1 rounded-md text-sm font-semibold hover:bg-gray-200 transition">
          Carrito (0)
        </button>
      </div>
    </nav>
  );
}