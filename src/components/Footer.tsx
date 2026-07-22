export default function Footer() {
  return (
    <footer className="p-6 text-center bg-gray-100 text-sm text-gray-500 border-t">
      © {new Date().getFullYear()} Undrstnd. Todos los derechos reservados.
    </footer>
  );
}