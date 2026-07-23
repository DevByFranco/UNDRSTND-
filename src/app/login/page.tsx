import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default function LoginPage() {
  
  // Esta es la Server Action (el "cerebro" del formulario)
  const signIn = async (formData: FormData) => {
    'use server'
    
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    // ¡Aquí agregamos el await!
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?error=true')
    }
    
    return redirect('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-4">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-lg border border-zinc-800 shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-2">UNDRSTND</h1>
        <p className="text-zinc-400 text-center mb-8">Ingresa al panel de administración</p>
        
        {/* Conectamos la acción al formulario usando "action" */}
        <form action={signIn} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico</label>
            <input 
              name="email"
              type="email" 
              required
              className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-md text-white focus:outline-none focus:border-white transition-colors" 
              placeholder="tu@correo.com" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input 
              name="password"
              type="password" 
              required
              className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-md text-white focus:outline-none focus:border-white transition-colors" 
              placeholder="••••••••" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-white text-black font-bold py-3 rounded-md mt-4 hover:bg-gray-200 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}