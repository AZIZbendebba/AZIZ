'use client'

import { useState } from 'react'
import { STATUTS_BL, type StatutBL } from '@/lib/bl/types'
import { changerStatutBL } from '@/app/admin/(protected)/bons-livraison/actions'
import { inputClass } from '@/lib/admin-ui'

export default function StatutBLSelect({ id, statut }: { id: string; statut: StatutBL }) {
  const [value, setValue] = useState(statut)
  const [pending, setPending] = useState(false)

  async function handleChange(nouveau: StatutBL) {
    const ancien = value
    setValue(nouveau)
    setPending(true)
    try {
      await changerStatutBL(id, nouveau)
      window.location.reload()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Mise à jour impossible.')
      setValue(ancien)
      setPending(false)
    }
  }

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) => handleChange(e.target.value as StatutBL)}
      className={inputClass}
    >
      {STATUTS_BL.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  )
}
