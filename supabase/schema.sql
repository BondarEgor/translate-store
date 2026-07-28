create table if not exists public.locales (
  code        text primary key,
  is_default  boolean not null default false,
  created_at  timestamptz not null default now()
);

create table if not exists public.namespaces (
  name        text primary key,
  created_at  timestamptz not null default now()
);

create table if not exists public.translations (
  namespace   text not null references public.namespaces(name) on delete cascade,
  key         text not null,
  locale      text not null references public.locales(code)   on delete cascade,
  value       text not null default '',
  updated_at  timestamptz not null default now(),
  primary key (namespace, key, locale)
);

create index if not exists translations_locale_idx    on public.translations (locale);
create index if not exists translations_namespace_idx on public.translations (namespace);

alter table public.locales      enable row level security;
alter table public.namespaces   enable row level security;
alter table public.translations enable row level security;

drop policy if exists "public read locales"      on public.locales;
drop policy if exists "public read namespaces"   on public.namespaces;
drop policy if exists "public read translations" on public.translations;

create policy "public read locales"
  on public.locales for select using (true);

create policy "public read namespaces"
  on public.namespaces for select using (true);

create policy "public read translations"
  on public.translations for select using (true);
