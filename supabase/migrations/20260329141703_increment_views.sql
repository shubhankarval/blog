create or replace function increment_blog_views(
  post_slug text,
  is_unique boolean,
  view_source text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- ALWAYS increment total views
  insert into public.blog_views (slug, views, unique_views)
  values (
    post_slug,
    1,
    case when is_unique then 1 else 0 end
  )
  on conflict (slug)
  do update set
    views = public.blog_views.views + 1,
    unique_views = public.blog_views.unique_views + (case when is_unique then 1 else 0 end),
    updated_at = now();

  -- ONLY increment source when unique (once per session)
  if is_unique then
    insert into public.blog_sources (slug, source, views)
    values (
      post_slug,
      view_source,
      1
    )
    on conflict (slug, source)
    do update set
      views = public.blog_sources.views + 1,
      updated_at = now();
  end if;
end;
$$;