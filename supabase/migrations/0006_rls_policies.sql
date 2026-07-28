-- Verbatim from pg_policies (2026-07-28).

alter table public.customers   enable row level security;
alter table public.products    enable row level security;
alter table public.orders      enable row level security;
alter table public.order_items enable row level security;
alter table public.profiles    enable row level security;

-- customers --------------------------------------------------
create policy customers_select_authenticated
  on public.customers for select
  to authenticated
  using (true);

create policy customers_write_manager_or_admin
  on public.customers for insert
  to authenticated
  with check (current_role() = any (array['admin', 'manager']));

create policy customers_update_manager_or_admin
  on public.customers for update
  to authenticated
  using (current_role() = any (array['admin', 'manager']))
  with check (current_role() = any (array['admin', 'manager']));

create policy customers_delete_admin_only
  on public.customers for delete
  to authenticated
  using (current_role() = 'admin');

-- products -----------------------------------------------------
create policy products_select_authenticated
  on public.products for select
  to authenticated
  using (true);

create policy products_write_manager_or_admin
  on public.products for insert
  to authenticated
  with check (current_role() = any (array['admin', 'manager']));

create policy products_update_manager_or_admin
  on public.products for update
  to authenticated
  using (current_role() = any (array['admin', 'manager']))
  with check (current_role() = any (array['admin', 'manager']));

create policy products_delete_admin_only
  on public.products for delete
  to authenticated
  using (current_role() = 'admin');

-- orders ---------------------------------------------------------
create policy orders_select_authenticated
  on public.orders for select
  to authenticated
  using (true);

create policy orders_write_manager_or_admin
  on public.orders for insert
  to authenticated
  with check (current_role() = any (array['admin', 'manager']));

create policy orders_update_manager_or_admin
  on public.orders for update
  to authenticated
  using (current_role() = any (array['admin', 'manager']))
  with check (current_role() = any (array['admin', 'manager']));

create policy orders_delete_admin_only
  on public.orders for delete
  to authenticated
  using (current_role() = 'admin');

-- order_items ------------------------------------------------------
create policy order_items_select_authenticated
  on public.order_items for select
  to authenticated
  using (true);

create policy order_items_write_manager_or_admin
  on public.order_items for insert
  to authenticated
  with check (current_role() = any (array['admin', 'manager']));

create policy order_items_update_manager_or_admin
  on public.order_items for update
  to authenticated
  using (current_role() = any (array['admin', 'manager']))
  with check (current_role() = any (array['admin', 'manager']));

create policy order_items_delete_admin_only
  on public.order_items for delete
  to authenticated
  using (current_role() = 'admin');

-- profiles -----------------------------------------------------------
create policy "Users can view their profile; admins can view all profiles"
  on public.profiles for select
  to authenticated
  using (id = auth.uid() or is_admin());

create policy "Admins can update profiles"
  on public.profiles for update
  to authenticated
  using (is_admin())
  with check (is_admin());
