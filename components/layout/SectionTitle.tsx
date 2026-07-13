type Props = {
  badge?: string;
  title: string;
  description?: string;
};

export default function SectionTitle({
  badge,
  title,
  description,
}: Props) {
  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">
      {badge && (
        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
          {badge}
        </span>
      )}

      <h2 className="mt-6 text-4xl font-bold text-slate-900">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-lg text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}