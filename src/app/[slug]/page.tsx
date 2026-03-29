import { notFound } from 'next/navigation';

import { getAllPosts, getPostBySlug } from '@lib/posts';
import Meta from '@components/mdx/Meta';
import Header from '@components/Header';
import TrackView from '@components/TrackView';

export const dynamicParams = false;

export function generateStaticParams() {
  // const posts = getAllPosts();

  // return posts.map((post) => ({
  //   slug: post.slug,
  // }));
  return [];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  notFound();
  // const slug = (await params).slug;
  // const frontmatter = getPostBySlug(slug);
  // if (!frontmatter) {
  //   notFound();
  // }
  // let Blog;
  // try {
  //   Blog = (await import(`@/blogs/${slug}.mdx`)).default;
  // } catch {
  //   notFound();
  // }
  // return (
  //   <div className="space-y-6">
  //     <Header />
  //     <div className="space-y-4.5">
  //       <Meta
  //         title={frontmatter.title}
  //         time={frontmatter.readingTime}
  //         date={frontmatter.updatedAt}
  //         tags={frontmatter.tags}
  //       />
  //       <Blog />
  //     </div>
  //     <TrackView slug={slug} />
  //   </div>
  // );
}
