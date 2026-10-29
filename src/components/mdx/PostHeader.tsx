import { LuClock } from 'react-icons/lu';

import { formatDate } from '@lib/utils';
import Tag from '@components/Tag';

interface PostHeaderProps {
  title: string;
  description?: string;
  label?: string;
  createdAt: string;
  updatedAt?: string;
  readingTime: number;
  tags: string[];
}

export default function PostHeader({
  title,
  description,
  label,
  createdAt,
  updatedAt,
  readingTime,
  tags,
}: PostHeaderProps) {
  const showUpdated = !!updatedAt && updatedAt !== createdAt;

  return (
    <header className="mb-12 space-y-3">
      {label && <Tag name={label} variant="label" />}

      <h1 className="text-3xl leading-tight font-semibold sm:text-4xl">{title}</h1>

      {description && <p className="text-lg leading-relaxed text-fg-soft/80">{description}</p>}

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        <div className="flex items-center gap-1">
          <LuClock className="size-4" />
          <div>{readingTime} min read</div>
        </div>

        <div>•</div>

        <div>{showUpdated ? `Published ${formatDate(createdAt)}` : formatDate(createdAt)}</div>

        {showUpdated && (
          <>
            <div>•</div>
            <div>Updated {formatDate(updatedAt)}</div>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
      </div>
    </header>
  );
}
