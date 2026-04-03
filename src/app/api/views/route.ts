import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export async function POST(req: Request) {
  try {
    const { slug, isUnique, source } = await req.json();

    if (!slug) {
      return new Response('Missing slug', { status: 400 });
    }

    const { error } = await supabase.rpc('increment_blog_views', {
      post_slug: slug,
      is_unique: isUnique,
      view_source: source,
    });

    if (error) {
      console.error(error);
      return new Response('Failed', { status: 500 });
    }

    return new Response('OK');
  } catch {
    return new Response('Invalid request', { status: 400 });
  }
}
