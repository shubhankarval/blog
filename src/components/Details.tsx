import { Clock } from 'lucide-react';

interface DetailsProps {
  time: number;
  date: string;
}

export default function Details({ time, date }: DetailsProps) {
  return (
    <div className="mb-12 flex items-center gap-2 text-sm text-muted">
      <div className="flex items-center gap-1">
        <Clock className="size-4" />
        <div>{time} min read</div>
      </div>
      <div> • </div>
      <div>{date}</div>
    </div>
  );
}
