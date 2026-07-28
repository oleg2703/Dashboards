-- Column nullability/defaults here match what's ACTUALLY live

create table public.customers (
  id           bigint generated always as identity primary key,
  name         text not null,
  email        text not null,
  "isActive"   boolean default true,
  "ordersCount" integer default 0,
  "totalSpent" numeric default 0,
  "createdAt"  date
);

create table public.products (
  id          bigint generated always as identity primary key,
  name        text not null,
  price       numeric not null,
  stock       integer not null,
  status      text not null,
  description text
);

create table public.orders (
  id          bigint generated always as identity primary key,
  "customerId" bigint,
  amount      numeric,
  status      text,
  date        date
);

create table public.order_items (
  id                 bigint generated always as identity primary key,
  "orderId"          bigint not null,
  "productId"        bigint not null,
  quantity           integer not null check (quantity > 0),
  "priceAtOrderTime" numeric not null check ("priceAtOrderTime" >= 0),
  "stockDeducted"    boolean not null default false
);

-- profiles.id is NOT its own identity — it's 1:1 with auth.users, see the
create table public.profiles (
  id         uuid primary key,
  email      text not null,
  full_name  text not null default '',
  role       public.user_role not null default 'viewer',
  created_at timestamptz not null default now()
);
