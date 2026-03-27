import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'src/blogs');

export type PostMeta = {
  slug: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  readingTime: number;
  description: string;
};

// In-memory cache (persists during build)
let cachedPosts: PostMeta[] | null = null;

export function getAllPosts(): PostMeta[] {
  if (cachedPosts) return cachedPosts;

  const files = fs.readdirSync(BLOG_DIR);

  cachedPosts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const fullPath = path.join(BLOG_DIR, file);

    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);

    const stats = readingTime(content);

    return {
      slug,
      title: data.title,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      readingTime: Math.round(stats.minutes),
      description: data.description,
    };
  });

  return cachedPosts;
}

export function getPostBySlug(slug: string): PostMeta | undefined {
  const posts = getAllPosts(); // uses cached data
  return posts.find((p) => p.slug === slug);
}
