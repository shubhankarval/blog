import NextImage from 'next/image';

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
      <h2 className="text-xl leading-tight font-semibold sm:text-2xl">{title}</h2>
      <span className="text-xs text-muted sm:text-sm">
        {time} min read • {formatDate(date)}
      </span>
      <p className="text-sm sm:text-base">{desc}</p>
    </a>
  );
}
