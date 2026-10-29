import Link from 'next/link';

import { formatDate } from '@lib/utils';
import Tag from '@components/Tag';

interface PostProps {
  title: string;
  link: string;
  date: string;
  time: number;
  desc: string;
  tags: string[];
}

export default function Post({ title, link, date, time, desc, tags }: PostProps) {
  return (
    <Link className="group flex flex-col gap-2" href={link}>
      <h2 className="text-2xl leading-tight font-semibold group-hover:text-primary">{title}</h2>
      <div className="flex items-center gap-1.5 text-xs text-muted">
        <div>{time} min read</div>
        <div> • </div>
        <div>{formatDate(date)}</div>
      </div>
      <p className="text-sm md:text-base">{desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
      </div>
    </Link>
  );
}
