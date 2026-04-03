create table if not exists blog_sources (
  slug text,
  source text,
  views bigint default 0,
  updated_at timestamptz default now(),
  primary key (slug, source)
);

alter table blog_sources enable row level security;

-- Anyone can read view counts (public blog)
create policy "public can read blog view sources"
  on blog_sources for select
  using (true);

-- Only service role can insert/update (your API route uses service role)
-- No insert/update/delete policy = anon users are blocked by default
