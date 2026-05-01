alter table public.companies enable row level security;

grant select, insert, update, delete on table public.companies to anon, authenticated;

drop policy if exists "Companies are readable by public clients" on public.companies;
create policy "Companies are readable by public clients"
on public.companies
for select
to anon, authenticated
using (true);

drop policy if exists "Companies can be inserted by public clients" on public.companies;
create policy "Companies can be inserted by public clients"
on public.companies
for insert
to anon, authenticated
with check (true);

drop policy if exists "Companies can be updated by public clients" on public.companies;
create policy "Companies can be updated by public clients"
on public.companies
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "Companies can be deleted by public clients" on public.companies;
create policy "Companies can be deleted by public clients"
on public.companies
for delete
to anon, authenticated
using (true);
