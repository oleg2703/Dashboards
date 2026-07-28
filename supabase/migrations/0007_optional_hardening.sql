-- OPTIONAL — review before running. These are gaps I noticed while
-- reading the live schema, but each one could fail or change behavior
-- depending on data that already exists, so they're not applied
-- automatically as part of the base migration set.

-- 1. customers.email has no UNIQUE constraint right now. Two customers
--    can currently share the same email. Check first:
--      select email, count(*) from public.customers group by email having count(*) > 1;
--    If that returns nothing, this is safe to add:
-- alter table public.customers add constraint customers_email_key unique (email);

-- 2. orders.amount / orders.status / orders.date are nullable right now.
--    In practice every order should have all three (create_order_with_items
--    always sets them), but nothing enforces it at the database level —
--    a direct insert bypassing the RPC could leave them null. Check first:
--      select id from public.orders where amount is null or status is null or date is null;
--    If that returns nothing, this is safe to add:
-- alter table public.orders alter column amount set not null;
-- alter table public.orders alter column status set not null;
-- alter table public.orders alter column date set not null;

-- 3. orders.status has no CHECK constraint restricting it to
--    'paid' | 'pending' | 'cancelled' (the only values the frontend's
--    TypeScript type allows) — right now the database would silently
--    accept any string. Check first:
--      select distinct status from public.orders;
--    If that only shows the three expected values, this is safe to add:
-- alter table public.orders add constraint orders_status_check
--   check (status in ('paid', 'pending', 'cancelled'));

-- 4. products.status has the same gap — TypeScript says
--    'Active' | 'Low Stock', but nothing in the database enforces it
--    (though recalculate_product_status() always sets a valid value on
--    write, so this is lower risk than #3):
-- alter table public.products add constraint products_status_check
--   check (status in ('Active', 'Low Stock'));
