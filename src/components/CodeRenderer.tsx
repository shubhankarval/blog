import { codeToTokens, type BundledLanguage, type SpecialLanguage } from 'shiki';

import Code from './Code';

interface CodeProps {
  children: { props: { children: string; className?: string } };
  lines?: (string | number)[];
}

export default async function CodeRenderer({ children, lines }: CodeProps) {
  const code = children.props.children.trimEnd();
  const lang =
    (children.props.className?.replace('language-', '') as BundledLanguage) ||
    ('txt' as SpecialLanguage);

  const tokens = await codeToTokens(code, {
    lang: lang,
    theme: 'vitesse-dark',
  });

  return <Code tokens={JSON.parse(JSON.stringify(tokens))} lines={lines} />;
}
