'use client';
import { type TokensResult } from 'shiki';
import { CodeBlock } from 'react-code-block/shiki';

import { cn } from '@lib/utils';

interface CodeProps {
  tokens: TokensResult;
  lines?: (string | number)[];
}

export default function Code({ tokens, lines }: CodeProps) {
  return (
    <CodeBlock tokens={tokens} lines={lines}>
      <CodeBlock.Code className="my-7 rounded-lg bg-code-block py-5 font-code text-sm shadow-lg">
        {({ isLineHighlighted }) => (
          <div
            className={cn(
              'table-row',
              lines && (isLineHighlighted ? 'bg-code-block-hg' : 'opacity-70')
            )}
          >
            <CodeBlock.LineNumber
              className={cn(
                'table-cell pr-4 pl-6 text-right text-xs select-none',
                isLineHighlighted ? 'text-gray-500' : 'text-gray-600'
              )}
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
