import { ReactNode } from 'react';
import { codeToTokens, type BundledLanguage } from 'shiki';

import { extractText } from '@lib/utils';
import CodeShiki from './CodeShiki';

interface CodeProps {
  children: ReactNode;
  language: BundledLanguage;
  lines?: (string | number)[];
}

export default async function CodeShikiRenderer({ children, language = 'js', lines }: CodeProps) {
  const code = extractText(children).trimEnd();

  const tokens = await codeToTokens(code, {
    lang: language,
    theme: 'vitesse-dark',
  });

  return <CodeShiki tokens={JSON.parse(JSON.stringify(tokens))} lines={lines} />;
}
