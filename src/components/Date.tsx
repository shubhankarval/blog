interface DateProps {
  date: string;
}

export default function Date({ date }: DateProps) {
  return <div className="mb-12 text-gray-300">{date}</div>;
}
