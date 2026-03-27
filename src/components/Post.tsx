import { formatDate, cn } from '@lib/utils';

interface PostProps {
  title: string;
  link: string;
  date: string;
  time: number;
  desc: string;
  tags: string[];
}

const accentText = ['text-accent-1', 'text-accent-2', 'text-accent-3', 'text-accent-4'];
const accentBg = ['bg-accent-1/10', 'bg-accent-2/10', 'bg-accent-3/10', 'bg-accent-4/10'];

export default function Post({ title, link, date, time, desc, tags }: PostProps) {
  return (
    <a className="group flex flex-col gap-2" href={link}>
      <h2 className="text-2xl leading-tight font-semibold group-hover:text-primary">{title}</h2>
      <div className="flex items-center gap-1.5 text-xs text-muted">
        <div>{time} min read</div>
        <div> • </div>
        <div>{formatDate(date)}</div>
      </div>
      <p className="text-sm md:text-base">{desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className={cn(
              'rounded-md bg-code px-2 py-0.5 font-mono text-xs',
              accentText[i % 4],
              accentBg[i % 4]
            )}
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
