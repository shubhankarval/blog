export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: 'example' }];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const { default: Blog } = await import(`@/blogs/${slug}.mdx`);

  return (
    <div className="mx-auto space-y-4.5 px-6 py-10 md:max-w-xl lg:max-w-3xl">
      <Blog />
    </div>
  );
}
