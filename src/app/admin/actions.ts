'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createProduct(formData: FormData) {
  // 1. Extraemos los datos que escribió el usuario en el formulario
  const name = formData.get('name') as string
  const price = parseFloat(formData.get('price') as string)
  const description = formData.get('description') as string

  // Validación básica
  if (!name || isNaN(price)) {
    throw new Error('El nombre y el precio son obligatorios.')
  }

  // 2. Guardamos en Supabase mediante Prisma
  await prisma.product.create({
    data: {
      name,
      price,
      description: description || null,
    },
  })

  // 3. Le decimos a Next.js que limpie la caché para que la página se actualice al instante
  revalidatePath('/admin')
  revalidatePath('/')
}