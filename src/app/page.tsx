import Link from 'next/link';

import { getAllPosts } from '@lib/posts';
import Post from '@components/Post';
import TrackView from '@components/TrackView';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10">
      <header>
        <Link href="/">
          <h1 className="text-5xl font-bold">blog.</h1>
        </Link>
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
      <TrackView slug="index" />
    </div>
  );
}
