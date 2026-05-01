alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;

grant select, insert, update, delete on table public.invoices to anon, authenticated;
grant select, insert, update, delete on table public.invoice_items to anon, authenticated;

drop policy if exists "Invoices are readable by public clients" on public.invoices;
create policy "Invoices are readable by public clients"
on public.invoices
for select
to anon, authenticated
using (true);

drop policy if exists "Invoices can be inserted by public clients" on public.invoices;
create policy "Invoices can be inserted by public clients"
on public.invoices
for insert
to anon, authenticated
with check (true);

drop policy if exists "Invoices can be updated by public clients" on public.invoices;
create policy "Invoices can be updated by public clients"
on public.invoices
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "Invoices can be deleted by public clients" on public.invoices;
create policy "Invoices can be deleted by public clients"
on public.invoices
for delete
to anon, authenticated
using (true);

drop policy if exists "Invoice items are readable by public clients" on public.invoice_items;
create policy "Invoice items are readable by public clients"
on public.invoice_items
for select
to anon, authenticated
using (true);

drop policy if exists "Invoice items can be inserted by public clients" on public.invoice_items;
create policy "Invoice items can be inserted by public clients"
on public.invoice_items
for insert
to anon, authenticated
with check (true);

drop policy if exists "Invoice items can be updated by public clients" on public.invoice_items;
create policy "Invoice items can be updated by public clients"
on public.invoice_items
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "Invoice items can be deleted by public clients" on public.invoice_items;
create policy "Invoice items can be deleted by public clients"
on public.invoice_items
for delete
to anon, authenticated
using (true);
