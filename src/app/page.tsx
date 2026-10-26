import type { Metadata } from 'next';
import Link from 'next/link';

import { getAllPosts } from '@lib/posts';
import Post from '@components/Post';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10">
      <header>
        <Link href="/">
          <h1 className="text-5xl leading-none font-bold">
            blog<span className="text-primary">.</span>
          </h1>
        </Link>
        <p className="mt-4 max-w-xl leading-[1.8] text-fg-soft">
          long reads and hot takes on engineering, design and tech, plus a few things I&apos;ve
          built along the way.
        </p>
      </header>
      <div className="mt-14 space-y-10 md:space-y-15">
        {posts.map((post) => (
          <Post
            key={post.slug}
            link={post.slug}
            title={post.title}
            date={post.updatedAt}
            time={post.readingTime}
            desc={post.description}
            tags={post.tags}
          />
        ))}
      </div>
    </div>
  );
}
