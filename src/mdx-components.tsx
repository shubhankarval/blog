import type { MDXComponents } from 'mdx/types';
import Heading from '@components/mdx/Heading';
import Callout from '@components/mdx/Callout';
import CodeRenderer from '@components/mdx/CodeRenderer';
import Collapsible from '@components/mdx/Collapsible';
import Figure from '@components/mdx/Figure';
import Quote from '@components/mdx/Quote';
import Summary from '@components/mdx/Summary';
import Term from '@components/mdx/Term';

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
    table: ({ children }) => (
      <div className="overflow-x-auto rounded-lg border border-bg-elevated text-[0.93rem]">
        <table className="w-full min-w-md border-collapse leading-normal">{children}</table>
      </div>
    ),
    tr: ({ children }) => <tr className="hover:bg-bg-soft/60">{children}</tr>,
    th: ({ children, style, align }) => (
      <th
        style={style}
        align={align}
        className="bg-bg-soft px-3.5 py-2.5 font-code text-xs font-semibold tracking-widest text-muted uppercase [&:not([align]):not([style])]:text-left"
      >
        {children}
      </th>
    ),
    td: ({ children, style, align }) => (
      <td
        style={style}
        align={align}
        className="border-t border-bg-elevated px-3.5 py-2.5 align-top text-fg-soft first:font-medium first:text-foreground"
      >
        {children}
      </td>
    ),
    img: ({ src, alt }) => <Figure src={src} alt={alt} />,
    Figure,
    Callout,
    Collapsible,
    Summary,
    Term,
    pre: (props) => <CodeRenderer {...props} />,
    code: ({ children }) => (
      <code className="rounded-sm bg-code px-1.5 py-0.5 font-code text-sm text-primary">
        {children}
      </code>
    ),
    blockquote: ({ children }) => <Quote>{children}</Quote>,
    Quote,
    section: ({ children, ...props }) =>
      'data-footnotes' in props ? (
        <section data-footnotes className="mt-12 border-t border-bg-elevated pt-5">
          {children}
        </section>
      ) : (
        <section className="space-y-5">{children}</section>
      ),
    ...components,
  };
}
