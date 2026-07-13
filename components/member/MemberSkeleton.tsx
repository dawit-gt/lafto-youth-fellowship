export default function MemberSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm animate-pulse">
      <div className="h-64 w-full bg-slate-200" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 rounded bg-slate-200" />
        <div className="h-4 w-1/2 rounded bg-slate-200" />
        <div className="h-4 w-2/3 rounded bg-slate-200" />
        <div className="h-10 w-full rounded-lg bg-slate-200" />
      </div>
    </div>
  );
}