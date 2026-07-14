'use client'

import { useState } from 'react'
import { supprimerBL } from '@/app/admin/(protected)/bons-livraison/actions'
import { buttonSecondaryClass } from '@/lib/admin-ui'

export default function DeleteBLButton({ id, stockDeduit }: { id: string; stockDeduit: boolean }) {
  const [pending, setPending] = useState(false)

  async function handleDelete() {
    const message = stockDeduit
      ? 'Ce BL a déjà déduit du stock — la suppression n\'annule pas cette déduction. Supprimer quand même ?'
      : 'Supprimer ce bon de livraison ? Cette action est irréversible.'
    if (!confirm(message)) return
    setPending(true)
    try {
      await supprimerBL(id)
      window.location.assign('/admin/bons-livraison')
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
