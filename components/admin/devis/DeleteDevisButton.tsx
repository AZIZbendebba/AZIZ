'use client'

import { useState } from 'react'
import { supprimerDevis } from '@/app/admin/(protected)/devis/actions'
import { buttonSecondaryClass } from '@/lib/admin-ui'

export default function DeleteDevisButton({ id }: { id: string }) {
  const [pending, setPending] = useState(false)

  async function handleDelete() {
    if (!confirm('Supprimer ce devis ? Cette action est irréversible.')) return
    setPending(true)
    try {
      await supprimerDevis(id)
      window.location.assign('/admin/devis')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Suppression impossible.')
      setPending(false)
    }
  }

  return (
    <button onClick={handleDelete} disabled={pending} className={buttonSecondaryClass}>
      {pending ? 'Suppression…' : 'Supprimer'}
    </button>
  )
}
