import { getAllPosts, getPostBySlug } from '@lib/posts';
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@lib/og';

export const alt = 'Blog post';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return renderOg({
    crumb: slug,
    title: post?.title ?? slug,
    description: post?.description ?? '',
  });
}
