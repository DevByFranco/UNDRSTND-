import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  // 1. Le pedimos a Supabase que verifique si hay un usuario logueado
  const { data: { user } } = await supabase.auth.getUser()

  // 2. Si no hay usuario, lo redirigimos inmediatamente al login
  if (!user) {
    redirect('/login')
  }

  // 3. Si sí hay usuario, dejamos que vea la página de admin
  return (
    <div className="admin-layout">
      {children}
    </div> 
  )
}