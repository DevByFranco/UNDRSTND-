'use client'

import { useState, useRef } from 'react'

export default function ImageUpload() {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Actualiza la previa cuando se selecciona una imagen
  const handleFileChange = (file: File | undefined) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setPreview(url)
    }
  }

  // Permite arrastrar y soltar el archivo
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    
    if (file && fileInputRef.current) {
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      fileInputRef.current.files = dataTransfer.files
      handleFileChange(file)
    }
  }

  // Quita la imagen seleccionada
  const handleRemove = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div>      
      {/* Input nativo oculto para compatibilidad total con Server Actions */}
      <input 
        type="file" 
        name="image" 
        accept="image/*" 
        ref={fileInputRef}
        required
        className="hidden" 
        onChange={(e) => handleFileChange(e.target.files?.[0])}
      />

      {!preview ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 ${
            isDragging 
              ? 'border-white bg-zinc-800' 
              : 'border-zinc-800 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
            📷
          </div>
          <p className="text-sm font-medium text-zinc-300">
            Arrastra tu imagen aquí o <span className="text-white underline">explora tus archivos</span>
          </p>
          <p className="text-xs text-zinc-500">PNG, JPG o WEBP</p>
        </div>
      ) : (
        <div className="relative w-full h-48 bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden flex items-center justify-center p-2">
          {/* Ignoramos el aviso de ESLint solo para la imagen previa local (Blob URL) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Previsualización" className="h-full object-contain rounded-md" />
          
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-2 py-1 rounded-md transition-colors shadow-lg"
          >
            Cambiar Imagen
          </button>
        </div>
      )}
    </div>
  )
}