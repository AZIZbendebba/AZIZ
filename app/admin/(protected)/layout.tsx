import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/components/admin/LogoutButton'

const NAV_LINKS = [
  { href: '/admin', label: 'Tableau de bord' },
  { href: '/admin/clients', label: 'Clients' },
  { href: '/admin/devis', label: 'Devis' },
  { href: '/admin/bons-livraison', label: 'Bons de livraison' },
  { href: '/admin/produits', label: 'Produits' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-noir-profond text-blanc-pur">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-8">
          <span className="font-cormorant text-lg">Groupe Promacryl — Gestion</span>
          <nav className="flex gap-5 text-sm text-gris-texte">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-or-champagne">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm text-gris-texte">
          <span>{user.email}</span>
          <LogoutButton />
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}
