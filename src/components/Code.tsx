'use client';
import { type ReactNode } from 'react';
import { CodeBlock } from 'react-code-block';
import { themes } from 'prism-react-renderer';

import { cn, extractText } from '@lib/utils';

interface CodeProps {
  children: ReactNode;
  language?: string;
  lines?: (string | number)[];
}

export default function Code({ children, language = 'js', lines }: CodeProps) {
  return (
    <CodeBlock
      code={extractText(children)}
      language={language}
      lines={lines}
      theme={themes.gruvboxMaterialDark}
    >
      <CodeBlock.Code className={'my-7 rounded-xl bg-[#181818] py-6 font-mono shadow-lg'}>
        {({ isLineHighlighted }) => (
          <div
            className={cn(
              'table-row',
              lines && (isLineHighlighted ? 'bg-violet-500/30' : 'opacity-60')
            )}
          >
            <CodeBlock.LineNumber
              className={`table-cell pr-4 pl-6 text-right text-sm select-none ${
                isLineHighlighted ? 'text-gray-300' : 'text-gray-500'
              }`}
            />
            <CodeBlock.LineContent className="table-cell w-full pr-6">
              <CodeBlock.Token />
            </CodeBlock.LineContent>
          </div>
        )}
      </CodeBlock.Code>
    </CodeBlock>
  );
}
