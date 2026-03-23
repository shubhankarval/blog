'use client';
import { type TokensResult } from 'shiki';
import { CodeBlock } from 'react-code-block/shiki';

import { cn } from '@lib/utils';

interface CodeProps {
  tokens: TokensResult;
  lines?: (string | number)[];
}

export default function Code({ tokens, lines }: CodeProps) {
  //   console.log('Tokens:', tokens);
  return (
    <CodeBlock tokens={tokens} lines={lines}>
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
