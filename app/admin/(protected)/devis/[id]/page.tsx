import { Fragment } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Devis, DevisLigne } from '@/lib/devis/types'
import { calculerTotaux, prixUnitaireNet, prixTotalNet } from '@/lib/devis/totaux'
import StatutDevisSelect from '@/components/admin/devis/StatutDevisSelect'
import DeleteDevisButton from '@/components/admin/devis/DeleteDevisButton'
import { buttonPrimaryClass, buttonSecondaryClass } from '@/lib/admin-ui'

type Props = { params: Promise<{ id: string }> }

const REGIME_LABEL: Record<string, string> = {
  Assujetti: 'Assujetti',
  'Non assujetti': 'Non assujetti',
  Exonere: 'Exonéré',
}

export default async function DevisDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: devisRow, error } = await supabase
    .from('devis')
    .select('*, clients(nom)')
    .eq('id', id)
    .maybeSingle()
  if (error) throw new Error(error.message)
  if (!devisRow) notFound()

  const devis = devisRow as Devis & { clients: { nom: string } | null }

  const { data: lignesData, error: lignesError } = await supabase
    .from('devis_lignes')
    .select('*')
    .eq('devis_id', id)
    .order('ordre')
  if (lignesError) throw new Error(lignesError.message)

  const lignes = lignesData as DevisLigne[]
  const totaux = calculerTotaux(lignes)

  let sectionCourante: string | null = null

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-cormorant text-2xl">Devis {devis.numero}</h1>
        <div className="flex gap-3">
          <a href={`/api/devis/${devis.id}/pdf`} className={buttonPrimaryClass}>
            Télécharger PDF
          </a>
          <Link href={`/admin/bons-livraison/nouveau?devis=${devis.id}`} className={buttonSecondaryClass}>
            Convertir en BL
          </Link>
          <Link href={`/admin/devis/${devis.id}/modifier`} className={buttonSecondaryClass}>
            Modifier
          </Link>
          <DeleteDevisButton id={devis.id} />
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-x-8 gap-y-3 border border-white/10 p-6 text-sm md:grid-cols-3">
        <Info label="Client" value={devis.clients?.nom ?? '—'} />
        <Info label="Entité" value={devis.entite} />
        <Info label="Date" value={devis.date} />
        <Info label="Régime TVA" value={REGIME_LABEL[devis.regime_tva] ?? devis.regime_tva} />
        <Info label="Matricule fiscal" value={devis.matricule_fiscal} />
        <div>
          <p className="mb-1 text-gris-texte">Statut</p>
          <StatutDevisSelect id={devis.id} statut={devis.statut} />
        </div>
        <Info label="Mode de livraison" value={devis.mode_livraison} />
        <Info label="Délai de livraison" value={devis.delai_livraison} />
        <Info label="Mode de paiement" value={devis.mode_paiement} />
        <Info label="Validité de l'offre" value={devis.validite} />
      </div>

      <div className="mb-4 overflow-x-auto border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gris-texte">
              <th className="p-3 font-normal">Code</th>
              <th className="p-3 font-normal">Unité</th>
              <th className="p-3 font-normal">Désignation</th>
              <th className="p-3 text-right font-normal">Qté</th>
              <th className="p-3 text-right font-normal">Prix unit. HTVA</th>
              <th className="p-3 text-right font-normal">Remise %</th>
              <th className="p-3 text-right font-normal">Prix unit. net</th>
              <th className="p-3 text-right font-normal">Prix total net</th>
            </tr>
          </thead>
          <tbody>
            {lignes.map((l) => {
              const nouvelleSection = l.section && l.section !== sectionCourante
              if (l.section) sectionCourante = l.section

              return (
                <Fragment key={l.id}>
                  {nouvelleSection && (
                    <tr key={`${l.id}-section`} className="border-b border-white/5 bg-white/5">
                      <td colSpan={8} className="p-3 font-medium">
                        {l.section}
                      </td>
                    </tr>
                  )}
                  {l.sous_groupe && (
                    <tr key={`${l.id}-sous-groupe`}>
                      <td colSpan={8} className="px-3 pt-2 text-xs text-gris-texte">
                        {l.sous_groupe}
                      </td>
                    </tr>
                  )}
                  <tr key={l.id} className="border-b border-white/5">
                    <td className="p-3 text-gris-texte">{l.code ?? '—'}</td>
                    <td className="p-3 text-gris-texte">{l.unite}</td>
                    <td className="p-3">{l.designation}</td>
                    <td className="p-3 text-right text-gris-texte">{l.qte}</td>
                    <td className="p-3 text-right text-gris-texte">{l.prix_unitaire_htva.toFixed(3)}</td>
                    <td className="p-3 text-right text-gris-texte">
                      {l.remise_pct != null ? `${l.remise_pct}%` : '—'}
                    </td>
                    <td className="p-3 text-right text-gris-texte">
                      {prixUnitaireNet(l.prix_unitaire_htva, l.remise_pct).toFixed(3)}
                    </td>
                    <td className="p-3 text-right">{prixTotalNet(l).toFixed(3)}</td>
                  </tr>
                </Fragment>
              )
            })}
            {lignes.length === 0 && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gris-texte">
                  Aucune ligne.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex">
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
      </div>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-gris-texte">{label}</p>
      <p>{value ?? '—'}</p>
    </div>
  )
}
