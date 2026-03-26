import React from 'react';
import { cn } from '@lib/utils';

interface HeadingProps {
  level: number;
  children: string;
}

export default function Code({ level, children }: HeadingProps) {
  const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements; // Dynamically select the heading tag
  const id = sanitizeId(children); // Generate an ID based on the text content

  return (
    <HeadingTag
      className={cn('group relative font-semibold', {
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

const sanitizeId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, '') // Remove all non-alphanumeric except spaces
    .trim()
    .replace(/\s+/g, '-'); // Replace spaces (and runs of spaces) with dashes
