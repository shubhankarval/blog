import React from 'react';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractText = (node: React.ReactNode): string => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return node.toString();
  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<
      unknown,
      string | React.JSXElementConstructor<unknown>
    >;
    const props = element.props as { children?: React.ReactNode };
    if (props.children !== undefined) {
      return extractText(props.children);
    }
  }
  return '';
};
