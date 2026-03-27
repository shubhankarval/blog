import { Clock } from 'lucide-react';

import { formatDate } from '@lib/utils';

interface MetaProps {
  title: string;
  time: number;
  date: string;
  tags: string[];
}

export default function Meta({ title, time, date, tags }: MetaProps) {
  return (
    <div className="mb-12 space-y-3">
      <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
      <div className="flex items-center gap-2 text-sm text-muted">
        <div className="flex items-center gap-1">
          <Clock className="size-4" />
          <div>{time} min read</div>
        </div>
        <div> • </div>
        <div>{formatDate(date)}</div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className="rounded-md bg-code px-2 py-0.5 font-mono text-xs text-fg-soft">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
