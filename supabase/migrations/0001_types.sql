-- Reflects the actual live database, confirmed via introspection queries
create type public.user_role as enum ('admin', 'manager', 'viewer');
