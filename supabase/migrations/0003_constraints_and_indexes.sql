
-- Foreign keys that ALREADY exist in production 
alter table public.order_items
  add constraint order_items_orderId_fkey
  foreign key ("orderId") references public.orders (id) on delete cascade;

alter table public.order_items
  add constraint order_items_productId_fkey
  foreign key ("productId") references public.products (id);


alter table public.profiles
  add constraint profiles_id_fkey
  foreign key (id) references auth.users (id) on delete cascade;


alter table public.orders
  add constraint orders_customerId_fkey
  foreign key ("customerId") references public.customers (id) on delete restrict;

-- Indexes that ALREADY exist

create index order_items_product_id_idx on public.order_items using btree ("productId");
create index order_items_order_id_idx on public.order_items using btree ("orderId");
create index orders_customer_id_idx on public.orders using btree ("customerId");
create index orders_status_idx on public.orders using btree (status);
