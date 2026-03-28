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
  tags: string[];
};

// In-memory cache (persists during build)
let cachedPosts: PostMeta[] | null = null;
let cachedTags: string[] | null = null;

function buildCache() {
  if (cachedPosts && cachedTags) return;

  const files = fs.readdirSync(BLOG_DIR);

  const posts: PostMeta[] = [];
  const tagSet = new Set<string>();

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    const fullPath = path.join(BLOG_DIR, file);

    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);

    const stats = readingTime(content);
    data.tags.forEach((tag: string) => tagSet.add(tag));

    posts.push({
      slug,
      title: data.title,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      readingTime: Math.round(stats.minutes),
      description: data.description,
      tags: data.tags,
    });
  }

  // Sort by newest first
  posts.sort((a, b) => {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);
    return dateB.getTime() - dateA.getTime();
  });
  cachedPosts = posts;
  cachedTags = Array.from(tagSet);
}

export function getAllPosts(): PostMeta[] {
  buildCache();
  return cachedPosts!;
}

export function getPostBySlug(slug: string): PostMeta | undefined {
  buildCache();
  return cachedPosts!.find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  buildCache();
  return cachedTags!;
}
