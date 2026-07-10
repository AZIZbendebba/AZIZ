-- ============================================================
-- Groupe Promacryl — Étape 2 : Module CRM (Clients) + Module Devis
-- ============================================================

-- Types énumérés ------------------------------------------------
create type secteur_client_enum as enum (
  'Résidentiel', 'Hôtellerie', 'Santé', 'Commercial', 'Institutionnel'
);
create type statut_client_enum as enum ('Prospect', 'Client');
create type statut_devis_enum as enum ('Brouillon', 'Envoyé', 'Accepté', 'Refusé');

-- Extension de la table clients (ne touche pas aux colonnes existantes) --
alter table public.clients
  add column secteur secteur_client_enum,
  add column statut statut_client_enum not null default 'Prospect';

-- Table devis (en-tête) -------------------------------------------
create table public.devis (
  id uuid primary key default gen_random_uuid(),
  numero text not null,
  client_id uuid not null references public.clients (id),
  entite entite_enum not null,
  regime_tva regime_tva_enum not null default 'Assujetti',
  matricule_fiscal text,
  mode_livraison text,
  delai_livraison text,
  mode_paiement text,
  validite text,
  statut statut_devis_enum not null default 'Brouillon',
  date date not null default current_date,
  cree_le timestamptz not null default now(),
  cree_par uuid references auth.users (id)
);

-- Lignes de devis, groupées par section/sous-groupe ----------------
-- "section" répétée à null = poursuite de la section précédente
-- (évite de dupliquer le titre de section dans l'affichage/le PDF).
create table public.devis_lignes (
  id uuid primary key default gen_random_uuid(),
  devis_id uuid not null references public.devis (id) on delete cascade,
  ordre integer not null,
  section text,
  sous_groupe text,
  produit_id uuid references public.produits (id),
  code text,
  unite unite_enum not null default 'PC',
  designation text not null,
  qte numeric(12, 3) not null default 1,
  prix_unitaire_htva numeric(12, 3) not null default 0,
  remise_pct numeric(5, 2)
);

create index devis_client_id_idx on public.devis (client_id);
create index devis_lignes_devis_id_idx on public.devis_lignes (devis_id);

-- Sécurité (RLS) — v1 : accès identique pour tout compte authentifié --
alter table public.devis enable row level security;
alter table public.devis_lignes enable row level security;

create policy "devis_authenticated_all" on public.devis
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "devis_lignes_authenticated_all" on public.devis_lignes
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
