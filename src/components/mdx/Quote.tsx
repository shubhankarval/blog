import type { ReactNode } from 'react';

interface QuoteProps {
  cite?: string;
  children: ReactNode;
}

export default function Quote({ cite, children }: Readonly<QuoteProps>) {
  return (
    <blockquote className="relative py-1.5 pl-7">
      <span
        aria-hidden="true"
        className="absolute -top-4 left-0 font-[Georgia,serif] text-7xl leading-none text-muted-primary opacity-50"
      >
        {'\u201C'}
      </span>
      <div className="space-y-3 text-xl leading-snug font-medium tracking-tight text-foreground sm:text-2xl">
        {children}
      </div>
      {cite && (
        <cite className="mt-3 block font-mono text-sm text-muted not-italic">
          {`\u2014`} {cite}
        </cite>
      )}
    </blockquote>
  );
}
