import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllPosts, getPostBySlug } from '@lib/posts';
import { getTocBySlug } from '@lib/toc';
import { toIsoDate } from '@lib/utils';
import Header from '@components/Header';
import PostHeader from '@components/mdx/PostHeader';
import TocProvider from '@components/toc/TocProvider';
import TocRail from '@components/toc/TocRail';
import TocBar from '@components/toc/TocBar';

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/${slug}`,
      publishedTime: toIsoDate(post.createdAt),
      modifiedTime: toIsoDate(post.updatedAt ?? post.createdAt),
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  const frontmatter = getPostBySlug(slug);
  if (!frontmatter) {
    notFound();
  }

  const { default: Blog } = await import(`@/blogs/${slug}.mdx`);
  const toc = getTocBySlug(slug);

  return (
    <TocProvider items={toc}>
      <div className="space-y-6">
        <TocBar variant="top" className="md:hidden" />
        <Header />
        <div className="relative">
          <div className="space-y-4.5">
            <PostHeader
              title={frontmatter.title}
              description={frontmatter.description}
              label={frontmatter.label}
              createdAt={frontmatter.createdAt}
              updatedAt={frontmatter.updatedAt}
              readingTime={frontmatter.readingTime}
              tags={frontmatter.tags}
            />
            <TocBar variant="inline" className="hidden md:block xl:hidden" />
            <article className="max-w-[68ch] space-y-[1.25em] text-[1.0625rem] leading-[1.8]">
              <Blog />
            </article>
          </div>
          <TocRail />
        </div>
      </div>
    </TocProvider>
  );
}
