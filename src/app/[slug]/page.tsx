import { notFound } from 'next/navigation';

import { getAllPosts, getPostBySlug } from '@lib/posts';
import { getTocBySlug } from '@lib/toc';
import Meta from '@components/mdx/Meta';
import Header from '@components/Header';
import TocProvider from '@components/toc/TocProvider';
import TocRail from '@components/toc/TocRail';
import TocBar from '@components/toc/TocBar';

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
  //   <TocProvider items={toc}>
  //     <div className="space-y-6">
  //       <TocBar variant="top" className="md:hidden" />
  //       <Header />
  //       <div className="relative">
  //         <div className="space-y-4.5">
  //           <Meta
  //             title={frontmatter.title}
  //             time={frontmatter.readingTime}
  //             date={frontmatter.updatedAt}
  //             tags={frontmatter.tags}
  //           />
  //           <TocBar variant="inline" className="hidden md:block xl:hidden" />
  //           <Blog />
  //         </div>
  //         <TocRail />
  //       </div>
  //     </div>
  //   </TocProvider>
  // );
}
