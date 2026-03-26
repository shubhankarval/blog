import NextImage from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  isDesc?: boolean;
}

export default function Image({ src, alt, isDesc }: ImageProps) {
  return (
    <div className="my-5">
      <NextImage
        src={src}
        alt={alt}
        width={2000}
        height={2000}
        className="h-auto w-full rounded-lg"
      />
      {isDesc && (
        <div className="flex justify-end">
          <span className="mt-1 mr-1 text-xs text-muted">{alt}</span>
        </div>
      )}
    </div>
  );
}
