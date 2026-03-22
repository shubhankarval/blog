import React from 'react';
import { cn, extractText } from '@lib/utils';

interface HeadingProps {
  level: number;
  children: React.ReactNode;
}

export default function Code({ level, children }: HeadingProps) {
  const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements; // Dynamically select the heading tag
  const id = sanitizeId(extractText(children)); // Generate an ID based on the text content

  return (
    <HeadingTag
      className={cn('group relative mt-8 mb-3 font-semibold', {
        'text-3xl': level === 2,
        'text-2xl': level === 3,
        'text-xl': level === 4,
        'text-lg': level === 5,
      })}
      id={id}
    >
      <a className="flex items-center" href={`#${id}`}>
        <span className="absolute -left-8 opacity-0 transition-opacity group-hover:opacity-30">
          #
        </span>
        {children}
      </a>
    </HeadingTag>
  );
}

const sanitizeId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, '') // Remove all non-alphanumeric except spaces
    .trim()
    .replace(/\s+/g, '-'); // Replace spaces (and runs of spaces) with dashes
