import type { MDXComponents } from 'mdx/types';
import Heading from '@components/mdx/Heading';
import CodeRenderer from '@components/mdx/CodeRenderer';
import Image from '@components/mdx/Image';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => <Heading level={2}>{children}</Heading>,
    h3: ({ children }) => <Heading level={3}>{children}</Heading>,
    h4: ({ children }) => <Heading level={4}>{children}</Heading>,
    h5: ({ children }) => <Heading level={5}>{children}</Heading>,
    h6: ({ children }) => <Heading level={6}>{children}</Heading>,
    p: ({ children }) => <p className="">{children}</p>,
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
      <ol className="ml-5 list-decimal space-y-1 leading-7 [&_ol]:ml-7 [&_ul]:ml-7">{children}</ol>
    ),
    ul: ({ children }) => (
      <ul className="ml-5 list-disc space-y-1 leading-7 [&_ol]:ml-7 [&_ul]:ml-7 [&_ul]:list-[circle] [&_ul_ul]:list-disc">
        {children}
      </ul>
    ),
    hr: () => <hr className="text-bg-elevated" />,
    img: ({ src, alt }) => <Image src={src} alt={alt} />,
    pre: (props) => <CodeRenderer {...props} />,
    code: ({ children }) => (
      <code className="rounded-sm bg-code px-1.5 py-0.5 font-code text-sm text-primary">
        {children}
      </code>
    ),
    blockquote: ({ children }) => (
      <blockquote className="flex overflow-hidden bg-bg-soft text-fg-soft">
        <span className="w-1.25 shrink-0 bg-muted-primary" />
        <div className="px-6 py-3 leading-7">{children}</div>
      </blockquote>
    ),
    section: ({ children }) => <section className="space-y-5">{children}</section>,
    ...components,
  };
}
