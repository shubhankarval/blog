import { getAllPosts } from '@lib/posts';
import Post from '@components/Post';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="px-6 py-8 sm:px-10">
      <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl">blog.</h1>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:mt-14">
        {posts.map((post) => (
          <Post
            key={post.slug}
            link={post.slug}
            title={post.title + post.title + post.title + post.title}
            date={post.updatedAt}
            time={post.readingTime}
            imgSrc={post.imgSrc}
            imgAlt={post.imgAlt}
          />
        ))}
      </div>
    </div>
  );
}
