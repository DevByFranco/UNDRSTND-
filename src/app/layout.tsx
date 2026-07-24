import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Undrstnd | Tienda Online",
  description: "E-commerce creado con Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased flex flex-col min-h-screen bg-black text-white">
        <Navbar />
        <div className="grow">
          {children} 
        </div>
        <Footer />
      </body>
    </html>
  );
}