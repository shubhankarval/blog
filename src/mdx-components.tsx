import type { MDXComponents } from 'mdx/types';
import Heading from '@components/mdx/Heading';
import Callout from '@components/mdx/Callout';
import CodeRenderer from '@components/mdx/CodeRenderer';
import Figure from '@components/mdx/Figure';
import Quote from '@components/mdx/Quote';
import Summary from '@components/mdx/Summary';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => <Heading level={2}>{children}</Heading>,
    h3: ({ children }) => <Heading level={3}>{children}</Heading>,
    h4: ({ children }) => <Heading level={4}>{children}</Heading>,
    h5: ({ children }) => <Heading level={5}>{children}</Heading>,
    h6: ({ children }) => <Heading level={6}>{children}</Heading>,
    p: ({ children }) => <p>{children}</p>,
    a: ({ children, href, id }) => (
      <a
        id={id}
        href={href}
        className="font-medium text-primary underline-offset-4 transition-opacity hover:underline hover:opacity-80"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    ol: ({ children }) => (
      <ol className="ml-5 list-decimal space-y-1 [&_ol]:ml-7 [&_ul]:ml-7">{children}</ol>
    ),
    ul: ({ children }) => (
      <ul className="ml-5 list-disc space-y-1 [&_ol]:ml-7 [&_ul]:ml-7 [&_ul]:list-[circle] [&_ul_ul]:list-disc">
        {children}
      </ul>
    ),
    hr: () => <hr className="text-bg-elevated" />,
    img: ({ src, alt }) => <Figure src={src} alt={alt} />,
    Figure,
    Callout,
    Summary,
    pre: (props) => <CodeRenderer {...props} />,
    code: ({ children }) => (
      <code className="rounded-sm bg-code px-1.5 py-0.5 font-code text-sm text-primary">
        {children}
      </code>
    ),
    blockquote: ({ children }) => <Quote>{children}</Quote>,
    Quote,
    section: ({ children }) => <section className="space-y-5">{children}</section>,
    ...components,
  };
}
