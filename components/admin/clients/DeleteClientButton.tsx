'use client'

import { useState } from 'react'
import { supprimerClient } from '@/app/admin/(protected)/clients/actions'
import { buttonSecondaryClass } from '@/lib/admin-ui'

export default function DeleteClientButton({ id }: { id: string }) {
  const [pending, setPending] = useState(false)

  async function handleDelete() {
    if (!confirm('Supprimer ce client ? Cette action est irréversible.')) return
    setPending(true)
    try {
      await supprimerClient(id)
      window.location.assign('/admin/clients')
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
