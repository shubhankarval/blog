import type { Metadata } from 'next';

import { getAllPosts } from '@lib/posts';
import Header from '@components/Header';
import Post from '@components/Post';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="px-4 pb-8 sm:px-6 lg:px-10">
      <Header />
      <section className="mt-6 sm:mt-8">
        <p className="font-code text-sm text-primary">{'// welcome to'}</p>
        <h1 className="mt-1 text-4xl leading-tight font-bold sm:text-5xl">
          my blog<span className="text-primary">.</span>
        </h1>
        <p className="mt-3 max-w-xl text-base leading-[1.8] text-fg-soft">
          thoughts on engineering, design, tech and what i&apos;m currently building.
        </p>
      </section>

      <div className="mt-14 divide-y divide-bg-elevated">
        {posts.map((post) => (
          <Post
            key={post.slug}
            link={post.slug}
            title={post.title}
            date={post.updatedAt ?? post.createdAt}
            time={post.readingTime}
            desc={post.description}
            label={post.label}
            tags={post.tags}
          />
        ))}
      </div>
    </div>
  );
}
