'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const AUTH_TIMEOUT_MS = 10000

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('TIMEOUT')), ms)
    promise.then(
      (value) => {
        clearTimeout(timer)
        resolve(value)
      },
      (err) => {
        clearTimeout(timer)
        reject(err)
      }
    )
  })
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error } = await withTimeout(
        supabase.auth.signInWithPassword({ email, password }),
        AUTH_TIMEOUT_MS
      )

      if (error) {
        setError('Email ou mot de passe incorrect.')
        setLoading(false)
        return
      }

      router.push('/admin')
    } catch (err) {
      const timedOut = err instanceof Error && err.message === 'TIMEOUT'
      setError(
        timedOut
          ? "Le serveur d'authentification ne répond pas. Vérifiez la connexion internet (ou un VPN/pare-feu qui bloquerait supabase.co)."
          : 'Connexion impossible. Réessayez.'
      )
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-noir-profond px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-or-champagne/20 bg-gris-fume p-8"
      >
        <h1 className="font-cormorant text-2xl text-blanc-pur mb-1">Groupe Promacryl</h1>
        <p className="mb-6 text-sm text-gris-texte">Application de gestion — connexion</p>

        <label htmlFor="email" className="mb-1 block text-sm text-gris-texte">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full border border-white/10 bg-noir-pur px-3 py-2 text-blanc-pur focus:border-or-champagne focus:outline-none"
        />

        <label htmlFor="password" className="mb-1 block text-sm text-gris-texte">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full border border-white/10 bg-noir-pur px-3 py-2 text-blanc-pur focus:border-or-champagne focus:outline-none"
        />

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-or-champagne py-2 font-medium text-noir-pur transition-colors hover:bg-or-clair disabled:opacity-50"
        >
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}
