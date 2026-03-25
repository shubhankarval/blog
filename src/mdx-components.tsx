import type { MDXComponents } from 'mdx/types';
import Heading from '@components/Heading';
import CodeRenderer from '@components/CodeRenderer';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="mb-3 text-4xl font-semibold">{children}</h1>,
    h2: ({ children }) => <Heading level={2}>{children}</Heading>,
    h3: ({ children }) => <Heading level={3}>{children}</Heading>,
    h4: ({ children }) => <Heading level={4}>{children}</Heading>,
    h5: ({ children }) => <Heading level={5}>{children}</Heading>,
    h6: ({ children }) => <Heading level={6}>{children}</Heading>,
    p: ({ children }) => <p className="mb-2">{children}</p>,
    a: ({ children, href }) => (
      <a
        href={href}
        className="font-medium text-primary underline-offset-4 transition-opacity hover:underline hover:opacity-80"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal">{children}</ol>,
    ul: ({ children }) => <ul className="mb-2 ml-3 list-disc">{children}</ul>,
    hr: () => <hr className="mt-5 mb-7 text-[#2e2e32]" />,
    pre: (props) => <CodeRenderer {...props} />,
    code: ({ children }) => (
      <code className="rounded-sm bg-code px-1.5 py-0.5 font-code text-sm text-primary">
        {children}
      </code>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 flex items-stretch overflow-hidden bg-background-soft text-foreground-soft">
        <span className="w-2 bg-muted-primary" />
        <div className="px-6 py-3 text-base leading-7 [&>p]:mb-0">{children}</div>
      </blockquote>
    ),
    ...components,
  };
}
