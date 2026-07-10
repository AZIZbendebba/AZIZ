'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  REGIMES_TVA,
  SECTEURS_CLIENT,
  STATUTS_CLIENT,
  type Client,
} from '@/lib/devis/types'
import { creerClient, modifierClient } from '@/app/admin/(protected)/clients/actions'
import { inputClass, labelClass, buttonPrimaryClass, buttonSecondaryClass } from '@/lib/admin-ui'

const schema = z.object({
  nom: z.string().min(1, 'Le nom / raison sociale est requis'),
  code_client: z.string().optional(),
  adresse: z.string().optional(),
  telephone: z.string().optional(),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  regime_tva: z.enum(['Assujetti', 'Non assujetti', 'Exonere']),
  matricule_fiscal: z.string().optional(),
  secteur: z.enum(['Résidentiel', 'Hôtellerie', 'Santé', 'Commercial', 'Institutionnel']).optional().or(z.literal('')),
  statut: z.enum(['Prospect', 'Client']),
  notes_crm: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export default function ClientForm({ client }: { client?: Client }) {
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: client
      ? {
          nom: client.nom,
          code_client: client.code_client ?? '',
          adresse: client.adresse ?? '',
          telephone: client.telephone ?? '',
          email: client.email ?? '',
          regime_tva: client.regime_tva,
          matricule_fiscal: client.matricule_fiscal ?? '',
          secteur: client.secteur ?? '',
          statut: client.statut,
          notes_crm: client.notes_crm ?? '',
        }
      : {
          regime_tva: 'Assujetti',
          statut: 'Prospect',
        },
  })

  async function onSubmit(values: FormValues) {
    setServerError(null)
    const input = {
      nom: values.nom.trim(),
      code_client: values.code_client?.trim() || null,
      adresse: values.adresse?.trim() || null,
      telephone: values.telephone?.trim() || null,
      email: values.email?.trim() || null,
      regime_tva: values.regime_tva,
      matricule_fiscal: values.matricule_fiscal?.trim() || null,
      secteur: (values.secteur?.trim() || null) as Client['secteur'],
      statut: values.statut,
      notes_crm: values.notes_crm?.trim() || null,
    }

    try {
      if (client) {
        await modifierClient(client.id, input)
        window.location.assign(`/admin/clients/${client.id}`)
      } else {
        const { id } = await creerClient(input)
        window.location.assign(`/admin/clients/${id}`)
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="nom">
            Nom / raison sociale *
          </label>
          <input id="nom" className={inputClass} {...register('nom')} />
          {errors.nom && <p className="mt-1 text-xs text-red-400">{errors.nom.message}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="code_client">
            Code client
          </label>
          <input id="code_client" className={inputClass} {...register('code_client')} />
        </div>

        <div>
          <label className={labelClass} htmlFor="statut">
            Statut
          </label>
          <select id="statut" className={inputClass} {...register('statut')}>
            {STATUTS_CLIENT.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="telephone">
            Téléphone
          </label>
          <input id="telephone" className={inputClass} {...register('telephone')} />
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input id="email" type="email" className={inputClass} {...register('email')} />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="adresse">
            Adresse
          </label>
          <input id="adresse" className={inputClass} {...register('adresse')} />
        </div>

        <div>
          <label className={labelClass} htmlFor="secteur">
            Secteur
          </label>
          <select id="secteur" className={inputClass} {...register('secteur')}>
            <option value="">—</option>
            {SECTEURS_CLIENT.map((s) => (
              <option key={s} value={s}>
                {s}
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
                {r === 'Non assujetti' ? 'Non assujetti' : r === 'Exonere' ? 'Exonéré' : r}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="matricule_fiscal">
            Matricule fiscal
          </label>
          <input
            id="matricule_fiscal"
            placeholder="Ex : 1705701Z A P 000"
            className={inputClass}
            {...register('matricule_fiscal')}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="notes_crm">
            Notes CRM
          </label>
          <textarea id="notes_crm" rows={4} className={inputClass} {...register('notes_crm')} />
        </div>
      </div>

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={isSubmitting} className={buttonPrimaryClass}>
          {isSubmitting ? 'Enregistrement…' : client ? 'Enregistrer' : 'Créer le client'}
        </button>
        <a
          href={client ? `/admin/clients/${client.id}` : '/admin/clients'}
          className={buttonSecondaryClass}
        >
          Annuler
        </a>
      </div>
    </form>
  )
}
