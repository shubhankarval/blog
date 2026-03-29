create table blog_views (
  slug text primary key,
  views bigint not null default 0,
  unique_views bigint not null default 0,
  updated_at timestamp with time zone default now()
);
