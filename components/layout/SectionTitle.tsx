type Props = {
  badge?: string;
  title: string;
  description?: string;
};

export default function SectionTitle({ badge, title, description }: Props) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center md:mb-16">
      {badge && (
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 md:px-4 md:py-2 md:text-sm">
          {badge}
        </span>
      )}
      <h2 className="mt-3 text-2xl font-bold text-slate-900 md:mt-6 md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-sm text-slate-600 md:mt-4 md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}