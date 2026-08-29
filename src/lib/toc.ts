import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { slugify } from '@lib/utils';

const BLOG_DIR = path.join(process.cwd(), 'src/blogs');

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

// In-memory cache (persists during build)
const cachedToc = new Map<string, TocItem[]>();

function stripCodeBlocks(content: string): string {
  return content.replace(/```[\s\S]*?```/g, '');
}

function stripInlineMarkdown(text: string): string {
  return text
    .replaceAll('`', '')
    .replace(/(\*|_){1,3}([^*_]+)\1/g, '$2')
    .trim();
}

export function getTocBySlug(slug: string): TocItem[] {
  const cached = cachedToc.get(slug);
  if (cached) return cached;

  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return [];

  const { content } = matter(fs.readFileSync(fullPath, 'utf8'));
  const body = stripCodeBlocks(content);

  const items: TocItem[] = [];
  const headingPattern = /^(#{2,3})\s+(.*)$/gm;

  let match: RegExpExecArray | null;
  while ((match = headingPattern.exec(body)) !== null) {
    const text = stripInlineMarkdown(match[2].replaceAll('\t', ' '));
    if (!text) continue;

    items.push({
      id: slugify(text),
      text,
      level: match[1].length as 2 | 3,
    });
  }

  cachedToc.set(slug, items);
  return items;
}
