create table blog_views (
  slug text primary key,
  views bigint not null default 0,
  unique_views bigint not null default 0,
  updated_at timestamp with time zone default now()
);

alter table blog_views enable row level security;

-- Anyone can read view counts (public blog)
create policy "public can read blog views"
  on blog_views for select
  using (true);

-- Only service role can insert/update (your API route uses service role)
-- No insert/update/delete policy = anon users are blocked by default
