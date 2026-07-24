'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
// Importa la función que creaste en tu archivo supabase.ts
// Ajusta la ruta '@/lib/supabase' según donde hayas guardado el archivo
import { createClient } from '@/lib/supabase' 

export async function createProduct(formData: FormData) {
  // 1. Extraemos los datos básicos
  const name = formData.get('name') as string
  const price = parseFloat(formData.get('price') as string)
  const description = formData.get('description') as string
  const imageFile = formData.get('image') as File | null

  // 2. Validación estricta: Ahora el nombre, el precio y LA IMAGEN son obligatorios
  if (!name || isNaN(price) || !imageFile || imageFile.size === 0) {
    throw new Error('El nombre, el precio y la imagen son obligatorios.')
  }

  // 3. Inicializamos el cliente de Supabase y preparamos la imagen
  const supabase = await createClient() 
  
  // Quitamos los espacios del nombre del archivo para evitar errores en la URL
  const safeFileName = imageFile.name.replace(/\s+/g, '-')
  const uniqueFileName = `${Date.now()}-${safeFileName}`

  // Subimos al bucket 'products'
  const { error } = await supabase.storage
    .from('products')
    .upload(uniqueFileName, imageFile)

  // Si hay un error subiendo la imagen, detenemos el proceso
  if (error) {
    console.error("Error subiendo la imagen a Supabase:", error)
    throw new Error('Hubo un problema subiendo la imagen.')
  }

  // 4. Obtenemos la URL pública (solo llegamos aquí si la subida fue exitosa)
  const { data } = supabase.storage
    .from('products')
    .getPublicUrl(uniqueFileName)
  
  const finalImageUrl = data.publicUrl

  // 5. Guardamos en Prisma (con la URL garantizada)
  await prisma.product.create({
    data: {
      name,
      price,
      description: description || null,
      imageUrl: finalImageUrl,
    },
  })

  // 6. Limpiamos la caché
  revalidatePath('/admin')
  revalidatePath('/')
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get('id') as string
  if (!id) return

  // Le decimos a Prisma que busque el producto por su ID y lo elimine
  await prisma.product.delete({
    where: { id },
  })

  // Limpiamos la caché
  revalidatePath('/admin')
  revalidatePath('/')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/login')
}