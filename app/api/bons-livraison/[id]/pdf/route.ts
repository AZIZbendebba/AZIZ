import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Client } from '@/lib/devis/types'
import type { BonLivraison, BonLivraisonLigne } from '@/lib/bl/types'
import { genererBonLivraisonPdf } from '@/lib/bl/pdf'

export const runtime = 'nodejs'

type Props = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: bl, error } = await supabase.from('bons_livraison').select('*').eq('id', id).maybeSingle()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!bl) return NextResponse.json({ error: 'Bon de livraison introuvable' }, { status: 404 })

  let client: Client | null = null
  const blTyped = bl as BonLivraison
  if (blTyped.client_id) {
    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .select('*')
      .eq('id', blTyped.client_id)
      .maybeSingle()
    if (clientError) return NextResponse.json({ error: clientError.message }, { status: 500 })
    client = clientData as Client | null
  }

  const { data: lignes, error: lignesError } = await supabase
    .from('bons_livraison_lignes')
    .select('*')
    .eq('bl_id', id)
    .order('ordre')
  if (lignesError) return NextResponse.json({ error: lignesError.message }, { status: 500 })

  const pdfBytes = await genererBonLivraisonPdf(blTyped, client, lignes as BonLivraisonLigne[])

  return new NextResponse(new Uint8Array(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="bl-${blTyped.numero.replace(/[^\w-]/g, '_')}.pdf"`,
      'Content-Length': String(pdfBytes.byteLength),
    },
  })
}
