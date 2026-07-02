-- ============================================================
-- Groupe Promacryl — Étape 1 : Fondations
-- Modèle de données (clients, produits) + comptes utilisateurs
-- Cahier des charges section 4.1, 4.2, 4.7
-- ============================================================

-- Types énumérés ------------------------------------------------
create type regime_tva_enum as enum ('Assujetti', 'Non assujetti', 'Exonere');
create type entite_enum as enum ('Solid Surface Tunisie', 'Techno-Logika');
create type unite_enum as enum ('PC', 'ML', 'KIT', 'UNITE', 'LOT');
create type role_utilisateur_enum as enum ('Admin', 'Commercial');

-- Table clients (section 4.1) ------------------------------------
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  code_client text,
  nom text not null,
  adresse text,
  telephone text,
  email text,
  regime_tva regime_tva_enum not null default 'Assujetti',
  matricule_fiscal text,
  notes_crm text,
  cree_le timestamptz not null default now(),
  cree_par uuid references auth.users (id)
);

-- Table produits (section 4.2) ------------------------------------
create table public.produits (
  id uuid primary key default gen_random_uuid(),
  entite entite_enum not null,
  code text not null,
  designation text not null,
  unite unite_enum not null,
  prix_unitaire_htva numeric(12, 3) not null default 0,
  stock_actuel numeric(12, 3) not null default 0,
  seuil_alerte numeric(12, 3) not null default 0,
  cree_le timestamptz not null default now()
);

-- Table utilisateurs (section 4.7) — profil lié à Supabase Auth ---
create table public.utilisateurs (
  id uuid primary key references auth.users (id) on delete cascade,
  nom text,
  email text not null,
  role role_utilisateur_enum not null default 'Commercial',
  actif boolean not null default true,
  cree_le timestamptz not null default now()
);

-- Crée automatiquement une fiche utilisateur à chaque compte créé
-- dans Supabase Auth (Dashboard > Authentication > Users).
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.utilisateurs (id, email, nom)
  values (new.id, new.email, new.raw_user_meta_data ->> 'nom');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Sécurité (RLS) ---------------------------------------------------
-- V1 : accès identique pour tous les comptes internes authentifiés
-- (pas de rôles différenciés, voir section 2.1 du cahier des charges).
alter table public.clients enable row level security;
alter table public.produits enable row level security;
alter table public.utilisateurs enable row level security;

create policy "clients_authenticated_all" on public.clients
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "produits_authenticated_all" on public.produits
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "utilisateurs_authenticated_select" on public.utilisateurs
  for select
  using (auth.role() = 'authenticated');

create policy "utilisateurs_self_update" on public.utilisateurs
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);
