'use client'

import { useState } from 'react'
import { supprimerProduit } from '@/app/admin/(protected)/produits/actions'
import { buttonSecondaryClass } from '@/lib/admin-ui'

export default function DeleteProduitButton({ id }: { id: string }) {
  const [pending, setPending] = useState(false)

  async function handleDelete() {
    if (!confirm('Supprimer ce produit ? Cette action est irréversible.')) return
    setPending(true)
    try {
      await supprimerProduit(id)
      window.location.assign('/admin/produits')
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
