
create trigger trg_order_items_insert_apply_stock
  before insert on public.order_items
  for each row
  execute function public.order_items_insert_apply_stock();

create trigger trg_order_items_delete_restore_stock
  after delete on public.order_items
  for each row
  execute function public.order_items_delete_restore_stock();

create trigger trg_orders_status_change_apply_stock
  after update on public.orders
  for each row
  execute function public.orders_status_change_apply_stock();

-- customers.totalSpent / ordersCount kept in sync with paid orders
create trigger trg_orders_recalculate_customer_stats
  after insert or update or delete on public.orders
  for each row
  execute function public.recalculate_customer_stats();

-- products.status recalculated from stock on every write, so the client
-- can send whatever it wants for status and the DB is the source of truth
create trigger trg_products_recalculate_status
  before insert or update on public.products
  for each row
  execute function public.recalculate_product_status();

-- creates a profiles row (default role = 'viewer') for every new
-- Supabase Auth signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.create_profile_for_new_user();
