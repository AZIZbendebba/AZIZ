'use client'

import { useState } from 'react'
import { STATUTS_DEVIS, type StatutDevis } from '@/lib/devis/types'
import { changerStatutDevis } from '@/app/admin/(protected)/devis/actions'
import { inputClass } from '@/lib/admin-ui'

export default function StatutDevisSelect({ id, statut }: { id: string; statut: StatutDevis }) {
  const [value, setValue] = useState(statut)
  const [pending, setPending] = useState(false)

  async function handleChange(nouveau: StatutDevis) {
    setValue(nouveau)
    setPending(true)
    try {
      await changerStatutDevis(id, nouveau)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Mise à jour impossible.')
      setValue(statut)
    } finally {
      setPending(false)
    }
  }

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) => handleChange(e.target.value as StatutDevis)}
      className={inputClass}
    >
      {STATUTS_DEVIS.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  )
}
