-- Reflects the actual live database, confirmed via introspection queries
-- (information_schema, pg_catalog) on 2026-07-28.

create type public.user_role as enum ('admin', 'manager', 'viewer');
