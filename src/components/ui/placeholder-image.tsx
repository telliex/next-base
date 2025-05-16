'use client';

export function PlaceholderImage({
  width = 400,
  height = 400,
  text = 'Placeholder',
}: {
  width?: number;
  height?: number;
  text?: string;
}) {
  return (
    <div
      className="flex items-center justify-center bg-gray-100 rounded-lg dark:bg-gray-800"
      style={{ width, height }}
    >
      <span className="text-gray-400">{text}</span>
    </div>
  );
}
