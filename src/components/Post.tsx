import { formatDate } from '@lib/utils';

interface PostProps {
  title: string;
  link: string;
  date: string;
  time: number;
  desc: string;
}

export default function Post({ title, link, date, time, desc }: PostProps) {
  return (
    <a className="flex flex-col gap-2" href={link}>
      <h2 className="text-xl leading-tight font-semibold md:text-2xl">{title}</h2>
      <div className="flex items-center gap-1.5 text-xs text-muted">
        <div>{time} min read</div>
        <div> • </div>
        <div className="font-upper">{formatDate(date, true)}</div>
      </div>
      <p className="text-sm md:text-base">{desc}</p>
    </a>
  );
}
