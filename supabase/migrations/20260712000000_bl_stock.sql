-- ============================================================
-- Groupe Promacryl — Étape 3 : Module Bon de livraison + Stock
-- ============================================================

create type statut_bl_enum as enum ('Brouillon', 'Validé', 'Livré');

-- Table bons_livraison (en-tête) -------------------------------------
-- client_id est optionnel : un BL peut être un transfert interne vers
-- dépôt/entrepôt sans client (destination en texte libre à la place).
create table public.bons_livraison (
  id uuid primary key default gen_random_uuid(),
  numero text not null,
  client_id uuid references public.clients (id),
  entite entite_enum not null,
  devis_id uuid references public.devis (id),
  date_livraison date not null default current_date,
  destination text,
  statut statut_bl_enum not null default 'Brouillon',
  -- Empêche une double déduction de stock si le statut est modifié
  -- plusieurs fois (ex. Validé -> Livré ne redéduit pas).
  stock_deduit boolean not null default false,
  cree_le timestamptz not null default now(),
  cree_par uuid references auth.users (id)
);

-- Lignes de BL — produit_id requis pour que la déduction de stock ait un
-- sens (contrairement aux lignes de devis où le produit est optionnel).
create table public.bons_livraison_lignes (
  id uuid primary key default gen_random_uuid(),
  bl_id uuid not null references public.bons_livraison (id) on delete cascade,
  ordre integer not null,
  produit_id uuid not null references public.produits (id),
  code text,
  unite unite_enum not null default 'PC',
  designation text not null,
  qte_livree numeric(12, 3) not null default 0
);

-- Historique des mouvements de stock (trace de chaque déduction) ------
create table public.mouvements_stock (
  id uuid primary key default gen_random_uuid(),
  produit_id uuid not null references public.produits (id),
  bl_id uuid references public.bons_livraison (id) on delete set null,
  -- négatif = sortie de stock (le seul cas géré pour l'instant)
  quantite numeric(12, 3) not null,
  date timestamptz not null default now(),
  cree_par uuid references auth.users (id)
);

create index bons_livraison_client_id_idx on public.bons_livraison (client_id);
create index bons_livraison_devis_id_idx on public.bons_livraison (devis_id);
create index bons_livraison_lignes_bl_id_idx on public.bons_livraison_lignes (bl_id);
create index mouvements_stock_produit_id_idx on public.mouvements_stock (produit_id);
create index mouvements_stock_bl_id_idx on public.mouvements_stock (bl_id);

-- Changement de statut atomique : si on passe en Validé ou Livré pour la
-- première fois (stock_deduit = false), déduit le stock de chaque produit
-- des lignes et journalise le mouvement, en une seule transaction. Pas de
-- blocage si le stock devient négatif (alerte visuelle gérée côté app) —
-- volontairement aucune contrainte "check (stock_actuel >= 0)".
create function public.changer_statut_bon_livraison(p_bl_id uuid, p_statut statut_bl_enum)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_deja_deduit boolean;
begin
  select stock_deduit into v_deja_deduit from bons_livraison where id = p_bl_id;

  if v_deja_deduit is null then
    raise exception 'Bon de livraison introuvable';
  end if;

  if p_statut in ('Validé', 'Livré') and not v_deja_deduit then
    -- Agrégée par produit_id : si un même produit apparaît sur plusieurs
    -- lignes du même BL, un UPDATE...FROM direct ne déduirait qu'une seule
    -- des lignes correspondantes au lieu de les cumuler.
    update produits pr
    set stock_actuel = pr.stock_actuel - agg.total
    from (
      select produit_id, sum(qte_livree) as total
      from bons_livraison_lignes
      where bl_id = p_bl_id
      group by produit_id
    ) agg
    where agg.produit_id = pr.id;

    insert into mouvements_stock (produit_id, bl_id, quantite, cree_par)
    select produit_id, p_bl_id, -qte_livree, auth.uid()
    from bons_livraison_lignes
    where bl_id = p_bl_id;

    update bons_livraison set statut = p_statut, stock_deduit = true where id = p_bl_id;
  else
    update bons_livraison set statut = p_statut where id = p_bl_id;
  end if;
end;
$$;

-- Sécurité (RLS) — v1 : accès identique pour tout compte authentifié --
alter table public.bons_livraison enable row level security;
alter table public.bons_livraison_lignes enable row level security;
alter table public.mouvements_stock enable row level security;

create policy "bons_livraison_authenticated_all" on public.bons_livraison
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "bons_livraison_lignes_authenticated_all" on public.bons_livraison_lignes
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "mouvements_stock_authenticated_all" on public.mouvements_stock
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant execute on function public.changer_statut_bon_livraison(uuid, statut_bl_enum) to authenticated;
