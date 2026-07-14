'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ENTITES, UNITES } from '@/lib/devis/types'
import type { Produit } from '@/lib/produits/types'
import { creerProduit, modifierProduit } from '@/app/admin/(protected)/produits/actions'
import { inputClass, labelClass, buttonPrimaryClass, buttonSecondaryClass } from '@/lib/admin-ui'

const schema = z.object({
  entite: z.enum(['Solid Surface Tunisie', 'Techno-Logika']),
  code: z.string().min(1, 'Le code est requis'),
  designation: z.string().min(1, 'La désignation est requise'),
  unite: z.enum(['PC', 'ML', 'KIT', 'UNITE', 'LOT']),
  prix_unitaire_htva: z.coerce.number().min(0, 'Prix invalide'),
  stock_actuel: z.coerce.number(),
  seuil_alerte: z.coerce.number().min(0, 'Seuil invalide'),
})

type FormValues = z.infer<typeof schema>

export default function ProduitForm({ produit }: { produit?: Produit }) {
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: produit
      ? {
          entite: produit.entite,
          code: produit.code,
          designation: produit.designation,
          unite: produit.unite,
          prix_unitaire_htva: produit.prix_unitaire_htva,
          stock_actuel: produit.stock_actuel,
          seuil_alerte: produit.seuil_alerte,
        }
      : {
          entite: 'Solid Surface Tunisie',
          unite: 'PC',
          prix_unitaire_htva: 0,
          stock_actuel: 0,
          seuil_alerte: 0,
        },
  })

  async function onSubmit(values: FormValues) {
    setServerError(null)
    try {
      if (produit) {
        await modifierProduit(produit.id, values)
        window.location.assign(`/admin/produits/${produit.id}`)
      } else {
        const { id } = await creerProduit(values)
        window.location.assign(`/admin/produits/${id}`)
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="entite">
            Entité
          </label>
          <select id="entite" className={inputClass} {...register('entite')}>
            {ENTITES.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="code">
            Code
          </label>
          <input id="code" placeholder="Ex : BE60/72" className={inputClass} {...register('code')} />
          {errors.code && <p className="mt-1 text-xs text-red-400">{errors.code.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="designation">
            Désignation
          </label>
          <input id="designation" className={inputClass} {...register('designation')} />
          {errors.designation && <p className="mt-1 text-xs text-red-400">{errors.designation.message}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="unite">
            Unité
          </label>
          <select id="unite" className={inputClass} {...register('unite')}>
            {UNITES.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="prix_unitaire_htva">
            Prix unitaire HTVA
          </label>
          <input
            id="prix_unitaire_htva"
            type="number"
            step="0.001"
            className={inputClass}
            {...register('prix_unitaire_htva')}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="stock_actuel">
            Stock actuel
          </label>
          <input id="stock_actuel" type="number" step="0.001" className={inputClass} {...register('stock_actuel')} />
        </div>

        <div>
          <label className={labelClass} htmlFor="seuil_alerte">
            Seuil d&apos;alerte
          </label>
          <input id="seuil_alerte" type="number" step="0.001" className={inputClass} {...register('seuil_alerte')} />
        </div>
      </div>

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={isSubmitting} className={buttonPrimaryClass}>
          {isSubmitting ? 'Enregistrement…' : produit ? 'Enregistrer' : 'Créer le produit'}
        </button>
        <a href={produit ? `/admin/produits/${produit.id}` : '/admin/produits'} className={buttonSecondaryClass}>
          Annuler
        </a>
      </div>
    </form>
  )
}
