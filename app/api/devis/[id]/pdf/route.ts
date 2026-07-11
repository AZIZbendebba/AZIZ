import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Client, Devis, DevisLigne } from '@/lib/devis/types'
import { genererDevisPdf } from '@/lib/devis/pdf'

export const runtime = 'nodejs'

type Props = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: devis, error } = await supabase.from('devis').select('*').eq('id', id).maybeSingle()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!devis) return NextResponse.json({ error: 'Devis introuvable' }, { status: 404 })

  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('*')
    .eq('id', (devis as Devis).client_id)
    .maybeSingle()
  if (clientError) return NextResponse.json({ error: clientError.message }, { status: 500 })
  if (!client) return NextResponse.json({ error: 'Client introuvable' }, { status: 404 })

  const { data: lignes, error: lignesError } = await supabase
    .from('devis_lignes')
    .select('*')
    .eq('devis_id', id)
    .order('ordre')
  if (lignesError) return NextResponse.json({ error: lignesError.message }, { status: 500 })

  const pdfBytes = await genererDevisPdf(devis as Devis, client as Client, lignes as DevisLigne[])

  return new NextResponse(new Uint8Array(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="devis-${(devis as Devis).numero.replace(/[^\w-]/g, '_')}.pdf"`,
      // Sans Content-Length explicite, la réponse part en Transfer-Encoding
      // chunked : certains proxies/antivirus ne relaient jamais le chunk
      // terminal sur les réponses binaires multi-paquets, ce qui bloque le
      // téléchargement indéfiniment (fichier .crdownload/.tmp).
      'Content-Length': String(pdfBytes.byteLength),
    },
  })
}
