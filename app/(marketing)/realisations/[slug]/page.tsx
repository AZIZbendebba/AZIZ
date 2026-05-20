import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return { title: slug }
}

export default async function RealisationPage({ params }: Props) {
  const { slug } = await params
  return (
    <section className="min-h-screen pt-32 bg-noir-profond">
      <div className="container-site">
        <h1 className="font-serif text-5xl text-blanc-pur">{slug}</h1>
      </div>
    </section>
  )
}
