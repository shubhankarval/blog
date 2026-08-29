import { notFound } from 'next/navigation';

import { getAllPosts, getPostBySlug } from '@lib/posts';
import { getTocBySlug } from '@lib/toc';
import Meta from '@components/mdx/Meta';
import Header from '@components/Header';
import Toc from '@components/ToC';

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

  // const { default: Blog } = await import(`@/blogs/${slug}.mdx`);
  // const toc = getTocBySlug(slug);

  // return (
  //   <div className="space-y-6">
  //     <Header />
  //     <div className="relative">
  //       <div className="space-y-4.5">
  //         <Meta
  //           title={frontmatter.title}
  //           time={frontmatter.readingTime}
  //           date={frontmatter.updatedAt}
  //           tags={frontmatter.tags}
  //         />
  //         <Blog />
  //       </div>
  //       <Toc items={toc} />
  //     </div>
  //   </div>
  // );
}
