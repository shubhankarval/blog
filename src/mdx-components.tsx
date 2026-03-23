import type { MDXComponents } from 'mdx/types';
import Heading from '@components/Heading';
import Code from '@components/CodeShikiRenderer';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="mb-3 text-4xl font-semibold">{children}</h1>,
    h2: ({ children }) => <Heading level={2}>{children}</Heading>,
    h3: ({ children }) => <Heading level={3}>{children}</Heading>,
    h4: ({ children }) => <Heading level={4}>{children}</Heading>,
    h5: ({ children }) => <Heading level={5}>{children}</Heading>,
    h6: ({ children }) => <Heading level={6}>{children}</Heading>,
    p: ({ children }) => <p className="mb-2">{children}</p>,
    ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal">{children}</ol>,
    ul: ({ children }) => <ul className="mb-2 ml-3 list-disc">{children}</ul>,
    pre: (props) => <Code {...props} />,
    ...components,
  };
}
