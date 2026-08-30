import React from 'react';
import { cn, slugify } from '@lib/utils';

interface HeadingProps {
  level: number;
  children: React.ReactNode;
}

export default function Code({ level, children }: HeadingProps) {
  const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements; // Dynamically select the heading tag
  const id = slugify(toText(children)); // Generate an ID based on the text content

  return (
    <HeadingTag
      className={cn('group relative scroll-mt-24 font-semibold', {
        'mt-10 text-2xl sm:text-3xl': level === 2,
        'mt-8 text-xl sm:text-2xl': level === 3,
        'mt-7 text-lg sm:text-xl': level === 4,
        'mt-6 sm:text-lg': level === 5,
      })}
      id={id}
    >
      <a className="flex items-center" href={`#${id}`}>
        <span
          className={cn(
            'absolute text-primary opacity-0 transition-opacity group-hover:opacity-70',
            {
              '-left-8': level === 2,
              '-left-7': level === 3,
              '-left-6': level === 4,
              '-left-5': level === 5 || level === 6,
            }
          )}
        >
          #
        </span>
        {children}
      </a>
    </HeadingTag>
  );
}

// MDX passes an array of nodes whenever a heading contains formatting, so flatten to plain text
function toText(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(toText).join('');
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return toText(node.props.children);
  }
  return '';
}
