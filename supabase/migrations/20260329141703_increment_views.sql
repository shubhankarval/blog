create or replace function increment_blog_views(
  post_slug text,
  is_unique boolean
)
returns void
language plpgsql
security definer                    
set search_path = ''               
as $$
begin
  insert into public.blog_views (slug, views, unique_views)  -- fully qualified
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
end;
$$;
