import { getAllPosts } from '@lib/posts';
import Post from '@components/Post';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="px-6 py-8 sm:px-10">
      <h1 className="text-5xl font-bold">blog.</h1>
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
