import { Clock } from 'lucide-react';

import { formatDate } from '@lib/utils';

interface MetaProps {
  title: string;
  time: number;
  date: string;
}

export default function Meta({ title, time, date }: MetaProps) {
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
    </div>
  );
}
