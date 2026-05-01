create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  city text,
  state text,
  postal_code text,
  country text,
  email text,
  phone text,
  website text,
  tax_id text,
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.invoices
add column if not exists company_id uuid references public.companies(id) on delete restrict;

create index if not exists invoices_company_id_idx on public.invoices(company_id);

drop trigger if exists companies_set_updated_at on public.companies;

create trigger companies_set_updated_at
before update on public.companies
for each row
execute function public.set_updated_at();
