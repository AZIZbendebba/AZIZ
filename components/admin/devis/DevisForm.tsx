'use client'

import { useState } from 'react'
import { useForm, useFieldArray, useWatch, type Control } from 'react-hook-form'
import { ENTITES, MODES_PAIEMENT, REGIMES_TVA, STATUTS_DEVIS, UNITES, type Devis, type DevisLigne } from '@/lib/devis/types'
import { calculerTotaux } from '@/lib/devis/totaux'
import { creerDevis, modifierDevis, type DevisHeaderInput, type DevisLigneInput } from '@/app/admin/(protected)/devis/actions'
import { inputClass, labelClass, buttonPrimaryClass, buttonSecondaryClass } from '@/lib/admin-ui'

const REGIME_LABEL: Record<string, string> = {
  Assujetti: 'Assujetti',
  'Non assujetti': 'Non assujetti',
  Exonere: 'Exonéré',
}

type LigneForm = {
  section: string
  sous_groupe: string
  code: string
  unite: string
  designation: string
  qte: string
  prix_unitaire_htva: string
  remise_pct: string
}

type FormValues = {
  client_id: string
  numero: string
  entite: string
  regime_tva: string
  matricule_fiscal: string
  mode_livraison: string
  delai_livraison: string
  mode_paiement: string
  validite: string
  statut: string
  lignes: LigneForm[]
}

function ligneVide(): LigneForm {
  return {
    section: '',
    sous_groupe: '',
    code: '',
    unite: 'PC',
    designation: '',
    qte: '1',
    prix_unitaire_htva: '0',
    remise_pct: '',
  }
}

function toLigneForm(l: DevisLigne): LigneForm {
  return {
    section: l.section ?? '',
    sous_groupe: l.sous_groupe ?? '',
    code: l.code ?? '',
    unite: l.unite,
    designation: l.designation,
    qte: String(l.qte),
    prix_unitaire_htva: String(l.prix_unitaire_htva),
    remise_pct: l.remise_pct != null ? String(l.remise_pct) : '',
  }
}

function TotalsPreview({ control }: { control: Control<FormValues> }) {
  const lignes = useWatch({ control, name: 'lignes' })
  const totaux = calculerTotaux(
    (lignes ?? []).map((l) => ({
      qte: Number(l.qte) || 0,
      prix_unitaire_htva: Number(l.prix_unitaire_htva) || 0,
      remise_pct: l.remise_pct ? Number(l.remise_pct) : null,
    }))
  )

  return (
    <div className="ml-auto grid w-full max-w-xs grid-cols-2 gap-y-1 text-sm">
      <span className="text-gris-texte">Total HTVA</span>
      <span className="text-right">{totaux.totalHtva.toFixed(3)}</span>
      <span className="text-gris-texte">Fodec 1%</span>
      <span className="text-right">{totaux.fodec.toFixed(3)}</span>
      <span className="text-gris-texte">TVA 19%</span>
      <span className="text-right">{totaux.tva.toFixed(3)}</span>
      <span className="text-gris-texte">Timbre</span>
      <span className="text-right">{totaux.timbre.toFixed(3)}</span>
      <span className="border-t border-white/10 pt-1 font-medium">TOTAL TTC</span>
      <span className="border-t border-white/10 pt-1 text-right font-medium">
        {totaux.totalTtc.toFixed(3)}
      </span>
    </div>
  )
}

export default function DevisForm({
  clients,
  devis,
  lignes,
  clientIdPreselect,
}: {
  clients: { id: string; nom: string }[]
  devis?: Devis
  lignes?: DevisLigne[]
  clientIdPreselect?: string
}) {
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: devis
      ? {
          client_id: devis.client_id,
          numero: devis.numero,
          entite: devis.entite,
          regime_tva: devis.regime_tva,
          matricule_fiscal: devis.matricule_fiscal ?? '',
          mode_livraison: devis.mode_livraison ?? '',
          delai_livraison: devis.delai_livraison ?? '',
          mode_paiement: devis.mode_paiement ?? '',
          validite: devis.validite ?? '',
          statut: devis.statut,
          lignes: lignes && lignes.length > 0 ? lignes.map(toLigneForm) : [ligneVide()],
        }
      : {
          client_id: clientIdPreselect ?? '',
          numero: '',
          entite: 'Solid Surface Tunisie',
          regime_tva: 'Assujetti',
          matricule_fiscal: '',
          mode_livraison: '',
          delai_livraison: '',
          mode_paiement: '',
          validite: '',
          statut: 'Brouillon',
          lignes: [ligneVide()],
        },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'lignes' })

  async function onSubmit(values: FormValues) {
    setServerError(null)

    if (!values.client_id) {
      setServerError('Sélectionnez un client.')
      return
    }
    if (!values.numero.trim()) {
      setServerError('Le numéro de devis est requis.')
      return
    }

    const lignesPayload: DevisLigneInput[] = values.lignes
      .filter((l) => l.designation.trim() !== '')
      .map((l, index) => ({
        ordre: index,
        section: l.section.trim() || null,
        sous_groupe: l.sous_groupe.trim() || null,
        produit_id: null,
        code: l.code.trim() || null,
        unite: l.unite as DevisLigne['unite'],
        designation: l.designation.trim(),
        qte: Number(l.qte) || 0,
        prix_unitaire_htva: Number(l.prix_unitaire_htva) || 0,
        remise_pct: l.remise_pct.trim() === '' ? null : Number(l.remise_pct),
      }))

    if (lignesPayload.length === 0) {
      setServerError('Ajoutez au moins une ligne avec une désignation.')
      return
    }

    const header: DevisHeaderInput = {
      client_id: values.client_id,
      numero: values.numero.trim(),
      entite: values.entite as Devis['entite'],
      regime_tva: values.regime_tva as Devis['regime_tva'],
      matricule_fiscal: values.matricule_fiscal.trim() || null,
      mode_livraison: values.mode_livraison.trim() || null,
      delai_livraison: values.delai_livraison.trim() || null,
      mode_paiement: values.mode_paiement.trim() || null,
      validite: values.validite.trim() || null,
      statut: values.statut as Devis['statut'],
    }

    try {
      if (devis) {
        await modifierDevis(devis.id, header, lignesPayload)
        window.location.assign(`/admin/devis/${devis.id}`)
      } else {
        const { id } = await creerDevis(header, lignesPayload)
        window.location.assign(`/admin/devis/${id}`)
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* En-tête */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className={labelClass} htmlFor="client_id">
            Client *
          </label>
          <select id="client_id" className={inputClass} {...register('client_id')}>
            <option value="">— Sélectionner —</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nom}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="numero">
            Numéro de devis *
          </label>
          <input id="numero" placeholder="N°83" className={inputClass} {...register('numero')} />
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
          <label className={labelClass} htmlFor="regime_tva">
            Régime TVA
          </label>
          <select id="regime_tva" className={inputClass} {...register('regime_tva')}>
            {REGIMES_TVA.map((r) => (
              <option key={r} value={r}>
                {REGIME_LABEL[r]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="matricule_fiscal">
            Matricule fiscal
          </label>
          <input id="matricule_fiscal" className={inputClass} {...register('matricule_fiscal')} />
        </div>

        <div>
          <label className={labelClass} htmlFor="statut">
            Statut
          </label>
          <select id="statut" className={inputClass} {...register('statut')}>
            {STATUTS_DEVIS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="mode_livraison">
            Mode de livraison
          </label>
          <input id="mode_livraison" className={inputClass} {...register('mode_livraison')} />
        </div>

        <div>
          <label className={labelClass} htmlFor="delai_livraison">
            Délai de livraison
          </label>
          <input id="delai_livraison" className={inputClass} {...register('delai_livraison')} />
        </div>

        <div>
          <label className={labelClass} htmlFor="mode_paiement">
            Mode de paiement
          </label>
          <select id="mode_paiement" className={inputClass} {...register('mode_paiement')}>
            <option value="">—</option>
            {MODES_PAIEMENT.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="validite">
            Validité de l&apos;offre
          </label>
          <input id="validite" placeholder="15/07/2026" className={inputClass} {...register('validite')} />
        </div>
      </div>

      {/* Lignes */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-cormorant text-xl">Lignes du devis</h2>
          <button type="button" onClick={() => append(ligneVide())} className={buttonSecondaryClass}>
            + Ajouter une ligne
          </button>
        </div>
        <p className="mb-4 text-xs text-gris-texte">
          Renseignez « Section » sur la première ligne d&apos;un groupe (ex. « TYPE 1 SALLE DE
          CONSULTATION ») et laissez-la vide sur les lignes suivantes pour rester dans le même
          groupe. « Sous-groupe » permet de rattacher des lignes liées (ex. plan de travail + cuve)
          sans répéter la section.
        </p>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-white/10 p-4">
              <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Section (titre de groupe)</label>
                  <input
                    className={inputClass}
                    placeholder="Ex : TYPE 1 SALLE DE CONSULTATION"
                    {...register(`lignes.${index}.section` as const)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Sous-groupe</label>
                  <input className={inputClass} {...register(`lignes.${index}.sous_groupe` as const)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-7">
                <div className="md:col-span-1">
                  <label className={labelClass}>Code</label>
                  <input className={inputClass} {...register(`lignes.${index}.code` as const)} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Désignation *</label>
                  <input className={inputClass} {...register(`lignes.${index}.designation` as const)} />
                </div>
                <div>
                  <label className={labelClass}>Unité</label>
                  <select className={inputClass} {...register(`lignes.${index}.unite` as const)}>
                    {UNITES.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Qté</label>
                  <input
                    type="number"
                    step="0.001"
                    className={inputClass}
                    {...register(`lignes.${index}.qte` as const)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Prix unit. HTVA</label>
                  <input
                    type="number"
                    step="0.001"
                    className={inputClass}
                    {...register(`lignes.${index}.prix_unitaire_htva` as const)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Remise %</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="—"
                    className={inputClass}
                    {...register(`lignes.${index}.remise_pct` as const)}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="mt-3 text-xs text-red-400 hover:underline"
              >
                Retirer cette ligne
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Totaux (aperçu live) */}
      <div className="flex border-t border-white/10 pt-6">
        <TotalsPreview control={control} />
      </div>

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={isSubmitting} className={buttonPrimaryClass}>
          {isSubmitting ? 'Enregistrement…' : devis ? 'Enregistrer' : 'Créer le devis'}
        </button>
        <a href={devis ? `/admin/devis/${devis.id}` : '/admin/devis'} className={buttonSecondaryClass}>
          Annuler
        </a>
      </div>
    </form>
  )
}
