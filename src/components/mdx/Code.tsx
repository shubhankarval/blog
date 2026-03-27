'use client';
import { useState } from 'react';
import { type TokensResult } from 'shiki';
import { CodeBlock } from 'react-code-block/shiki';
import { Copy, Check } from 'lucide-react';

import { cn } from '@lib/utils';

interface CodeProps {
  tokens: TokensResult;
  code: string;
  lines?: (string | number)[];
}

export default function Code({ tokens, code, lines }: CodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {(isHovered || isCopied) && (
        <button
          title="Copy Code"
          onClick={handleCopy}
          className="absolute top-2 right-2 cursor-pointer rounded-lg text-muted hover:bg-code"
        >
          {isCopied ? <Check size={16} className="m-1.5" /> : <Copy size={16} className="m-1.5" />}
        </button>
      )}
      <CodeBlock tokens={tokens} lines={lines}>
        <CodeBlock.Code className="scrollbar-thin overflow-x-auto rounded-lg bg-code-block py-5 font-code text-sm shadow-lg scrollbar-thumb-bg-soft scrollbar-track-transparent">
          {({ isLineHighlighted }) => (
            <div
              className={cn('table-row', lines && (isLineHighlighted ? 'bg-code' : 'opacity-70'))}
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
    </div>
  );
}
