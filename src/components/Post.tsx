import NextImage from 'next/image';

import { formatDate } from '@lib/utils';

interface PostProps {
  title: string;
  link: string;
  date: string;
  time: number;
  imgSrc: string;
  imgAlt: string;
}

export default function Post({ title, link, date, time, imgSrc, imgAlt }: PostProps) {
  return (
    <a className="overflow-hidden" href={link}>
      <div className="relative h-48 w-full overflow-hidden rounded-lg md:h-52 lg:h-56">
        <NextImage
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center"
        />
      </div>
      <h2 className="mt-4 text-2xl leading-tight font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted">
        {time} min read • {formatDate(date)}
      </p>
    </a>
  );
}
