'use client'

import { createClient } from '@/lib/supabase/client'

export default function LogoutButton() {
  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.assign('/admin/login')
  }

  return (
    <button onClick={handleLogout} className="underline hover:text-or-champagne">
      Déconnexion
    </button>
  )
}
