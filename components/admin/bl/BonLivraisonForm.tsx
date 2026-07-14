'use client'

import { useState } from 'react'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import { ENTITES, type Entite } from '@/lib/devis/types'
import type { Produit } from '@/lib/produits/types'
import type { BonLivraison, BonLivraisonLigne } from '@/lib/bl/types'
import {
  creerBL,
  modifierBL,
  type BLHeaderInput,
  type BLLigneInput,
} from '@/app/admin/(protected)/bons-livraison/actions'
import { inputClass, labelClass, buttonPrimaryClass, buttonSecondaryClass } from '@/lib/admin-ui'

type LigneForm = {
  produit_id: string
  code: string
  unite: string
  designation: string
  qte_livree: string
}

type FormValues = {
  numero: string
  client_id: string
  entite: Entite
  date_livraison: string
  destination: string
  lignes: LigneForm[]
}

function ligneVide(): LigneForm {
  return { produit_id: '', code: '', unite: '', designation: '', qte_livree: '1' }
}

function toLigneForm(l: BonLivraisonLigne): LigneForm {
  return {
    produit_id: l.produit_id,
    code: l.code ?? '',
    unite: l.unite,
    designation: l.designation,
    qte_livree: String(l.qte_livree),
  }
}

export default function BonLivraisonForm({
  clients,
  produits,
  bl,
  lignes,
  devisId,
  clientIdPreselect,
  entitePreselect,
  lignesPreselect,
}: {
  clients: { id: string; nom: string }[]
  produits: Produit[]
  bl?: BonLivraison
  lignes?: BonLivraisonLigne[]
  devisId?: string
  clientIdPreselect?: string
  entitePreselect?: Entite
  lignesPreselect?: { code: string | null; designation: string; unite: string; qte: number }[]
}) {
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: bl
      ? {
          numero: bl.numero,
          client_id: bl.client_id ?? '',
          entite: bl.entite,
          date_livraison: bl.date_livraison,
          destination: bl.destination ?? '',
          lignes: lignes && lignes.length > 0 ? lignes.map(toLigneForm) : [ligneVide()],
        }
      : {
          numero: '',
          client_id: clientIdPreselect ?? '',
          entite: entitePreselect ?? 'Solid Surface Tunisie',
          date_livraison: new Date().toISOString().slice(0, 10),
          destination: '',
          lignes:
            lignesPreselect && lignesPreselect.length > 0
              ? lignesPreselect.map((l) => ({
                  produit_id: '',
                  code: l.code ?? '',
                  unite: l.unite,
                  designation: l.designation,
                  qte_livree: String(l.qte),
                }))
              : [ligneVide()],
        },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'lignes' })
  const entiteChoisie = useWatch({ control, name: 'entite' })
  const produitsFiltres = produits.filter((p) => p.entite === entiteChoisie)

  function handleProduitChange(index: number, produitId: string) {
    const produit = produits.find((p) => p.id === produitId)
    setValue(`lignes.${index}.produit_id`, produitId)
    if (produit) {
      setValue(`lignes.${index}.code`, produit.code)
      setValue(`lignes.${index}.designation`, produit.designation)
      setValue(`lignes.${index}.unite`, produit.unite)
    }
  }

  async function onSubmit(values: FormValues) {
    setServerError(null)

    if (!values.numero.trim()) {
      setServerError('Le numéro de BL est requis.')
      return
    }

    const lignesPayload: BLLigneInput[] = values.lignes
      .filter((l) => l.produit_id)
      .map((l, index) => ({
        ordre: index,
        produit_id: l.produit_id,
        code: l.code.trim() || null,
        unite: l.unite,
        designation: l.designation.trim(),
        qte_livree: Number(l.qte_livree) || 0,
      }))

    if (lignesPayload.length === 0) {
      setServerError('Ajoutez au moins une ligne avec un produit sélectionné.')
      return
    }

    const header: BLHeaderInput = {
      numero: values.numero.trim(),
      client_id: values.client_id || null,
      entite: values.entite,
      devis_id: bl?.devis_id ?? devisId ?? null,
      date_livraison: values.date_livraison,
      destination: values.destination.trim() || null,
    }

    try {
      if (bl) {
        await modifierBL(bl.id, header, lignesPayload)
        window.location.assign(`/admin/bons-livraison/${bl.id}`)
      } else {
        const { id } = await creerBL(header, lignesPayload)
        window.location.assign(`/admin/bons-livraison/${id}`)
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className={labelClass} htmlFor="numero">
            Numéro de BL *
          </label>
          <input id="numero" placeholder="N°12" className={inputClass} {...register('numero')} />
        </div>

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
          <label className={labelClass} htmlFor="date_livraison">
            Date de livraison
          </label>
          <input id="date_livraison" type="date" className={inputClass} {...register('date_livraison')} />
        </div>

        <div>
          <label className={labelClass} htmlFor="client_id">
            Client (optionnel)
          </label>
          <select id="client_id" className={inputClass} {...register('client_id')}>
            <option value="">— Aucun (transfert interne) —</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="destination">
            Destination / référence
          </label>
          <input
            id="destination"
            placeholder="Ex : Dépôt Sousse, ou référence chantier"
            className={inputClass}
            {...register('destination')}
          />
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-cormorant text-xl">Produits livrés</h2>
          <button type="button" onClick={() => append(ligneVide())} className={buttonSecondaryClass}>
            + Ajouter une ligne
          </button>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-3 border border-white/10 p-4 md:grid-cols-6">
              <div className="md:col-span-2">
                <label className={labelClass}>Produit</label>
                <select
                  className={inputClass}
                  {...register(`lignes.${index}.produit_id` as const)}
                  onChange={(e) => handleProduitChange(index, e.target.value)}
                >
                  <option value="">— Sélectionner —</option>
                  {produitsFiltres.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.code} — {p.designation}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Code</label>
                <input className={inputClass} readOnly {...register(`lignes.${index}.code` as const)} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Désignation</label>
                <input className={inputClass} readOnly {...register(`lignes.${index}.designation` as const)} />
              </div>
              <div>
                <label className={labelClass}>Unité</label>
                <input className={inputClass} readOnly {...register(`lignes.${index}.unite` as const)} />
              </div>
              <div>
                <label className={labelClass}>Qté livrée</label>
                <input
                  type="number"
                  step="0.001"
                  className={inputClass}
                  {...register(`lignes.${index}.qte_livree` as const)}
                />
              </div>
              <div className="flex items-end">
                <button type="button" onClick={() => remove(index)} className="text-xs text-red-400 hover:underline">
                  Retirer cette ligne
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={isSubmitting} className={buttonPrimaryClass}>
          {isSubmitting ? 'Enregistrement…' : bl ? 'Enregistrer' : 'Créer le bon de livraison'}
        </button>
        <a href={bl ? `/admin/bons-livraison/${bl.id}` : '/admin/bons-livraison'} className={buttonSecondaryClass}>
          Annuler
        </a>
      </div>
    </form>
  )
}
