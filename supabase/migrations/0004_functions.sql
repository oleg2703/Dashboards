
create or replace function public.current_role()
returns text
language sql
stable security definer
set search_path to 'public'
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable security definer
set search_path to 'public'
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$;

create or replace function public.recalculate_product_status()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  new.status := case
    when new.stock > 5 then 'Active'
    else 'Low Stock'
  end;

  return new;
end;
$$;

create or replace function public.recalculate_customer_stats()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if tg_op = 'INSERT' then
    if new.status = 'paid' then
      update public.customers
      set "totalSpent" = "totalSpent" + new.amount,
          "ordersCount" = "ordersCount" + 1
      where id = new."customerId";
    end if;

    return new;

  elsif tg_op = 'UPDATE' then
    if old.status = 'paid' and new.status = 'paid' then
      if old."customerId" is distinct from new."customerId" then
        update public.customers
        set "totalSpent" = "totalSpent" - old.amount,
            "ordersCount" = "ordersCount" - 1
        where id = old."customerId";

        update public.customers
        set "totalSpent" = "totalSpent" + new.amount,
            "ordersCount" = "ordersCount" + 1
        where id = new."customerId";

      elsif old.amount is distinct from new.amount then
        update public.customers
        set "totalSpent" = "totalSpent" + (new.amount - old.amount)
        where id = new."customerId";
      end if;

    elsif old.status is distinct from 'paid' and new.status = 'paid' then
      update public.customers
      set "totalSpent" = "totalSpent" + new.amount,
          "ordersCount" = "ordersCount" + 1
      where id = new."customerId";

    elsif old.status = 'paid' and new.status is distinct from 'paid' then
      update public.customers
      set "totalSpent" = "totalSpent" - old.amount,
          "ordersCount" = "ordersCount" - 1
      where id = old."customerId";
    end if;

    return new;

  elsif tg_op = 'DELETE' then
    if old.status = 'paid' then
      update public.customers
      set "totalSpent" = "totalSpent" - old.amount,
          "ordersCount" = "ordersCount" - 1
      where id = old."customerId";
    end if;

    return old;
  end if;

  return null;
end;
$$;

create or replace function public.deduct_stock_for_order_item(
  p_product_id bigint,
  p_quantity integer
)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_new_stock integer;
begin
  update public.products
  set stock = stock - p_quantity
  where id = p_product_id
  returning stock into v_new_stock;

  if v_new_stock is null then
    raise exception 'Product % not found', p_product_id;
  end if;

  if v_new_stock < 0 then
    raise exception 'Not enough stock for product % (short by %)',
      p_product_id, abs(v_new_stock);
  end if;
end;
$$;

create or replace function public.restore_stock_for_order_item(
  p_product_id bigint,
  p_quantity integer
)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  update public.products
  set stock = stock + p_quantity
  where id = p_product_id;
end;
$$;

create or replace function public.order_items_insert_apply_stock()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_order_status text;
begin
  select status into v_order_status
  from public.orders
  where id = new."orderId";

  if v_order_status = 'paid' then
    perform public.deduct_stock_for_order_item(new."productId", new.quantity);
    new."stockDeducted" := true;
  end if;

  return new;
end;
$$;

create or replace function public.order_items_delete_restore_stock()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if old."stockDeducted" then
    perform public.restore_stock_for_order_item(old."productId", old.quantity);
  end if;

  return old;
end;
$$;

create or replace function public.orders_status_change_apply_stock()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_item record;
begin
  if old.status is distinct from new.status then
    if new.status = 'paid' and old.status is distinct from 'paid' then
      for v_item in
        select "productId", quantity
        from public.order_items
        where "orderId" = new.id
          and "stockDeducted" = false
      loop
        perform public.deduct_stock_for_order_item(v_item."productId", v_item.quantity);
      end loop;

      update public.order_items
      set "stockDeducted" = true
      where "orderId" = new.id
        and "stockDeducted" = false;

    elsif old.status = 'paid' and new.status is distinct from 'paid' then
      for v_item in
        select "productId", quantity
        from public.order_items
        where "orderId" = new.id
          and "stockDeducted" = true
      loop
        perform public.restore_stock_for_order_item(v_item."productId", v_item.quantity);
      end loop;

      update public.order_items
      set "stockDeducted" = false
      where "orderId" = new.id
        and "stockDeducted" = true;
    end if;
  end if;

  return new;
end;
$$;

create or replace function public.create_order_with_items(
  customer_id bigint,
  items jsonb
)
returns public.orders
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  new_order   public.orders;
  item_value  jsonb;
  product_row public.products;
  total       numeric(10, 2) := 0;
begin
  if public.current_role() not in ('admin', 'manager') then
    raise exception 'Not authorized to create orders';
  end if;

  if items is null or jsonb_array_length(items) = 0 then
    raise exception 'Order must contain at least one item';
  end if;

  for item_value in
    select value
    from jsonb_array_elements(items) as item_json
    order by (item_json->>'productId')::bigint
  loop
    select * into product_row
    from public.products
    where id = (item_value->>'productId')::bigint
    for update;

    if not found then
      raise exception 'Product % does not exist', item_value->>'productId';
    end if;

    if product_row.stock < (item_value->>'quantity')::integer then
      raise exception 'Not enough stock for %: % available, % requested',
        product_row.name, product_row.stock, item_value->>'quantity';
    end if;

    total := total + product_row.price * (item_value->>'quantity')::integer;
  end loop;

  insert into public.orders ("customerId", amount, status, date)
  values (customer_id, total, 'pending', current_date)
  returning * into new_order;

  insert into public.order_items ("orderId", "productId", "quantity", "priceAtOrderTime")
  select
    new_order.id,
    (item_json->>'productId')::bigint,
    (item_json->>'quantity')::integer,
    p.price
  from jsonb_array_elements(items) as item_json
  join public.products p on p.id = (item_json->>'productId')::bigint;

  return new_order;
end;
$$;

revoke execute on function public.create_order_with_items(bigint, jsonb) from public;
grant execute on function public.create_order_with_items(bigint, jsonb) to authenticated;
