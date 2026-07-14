import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-3 md:mt-10 md:gap-4">
      <Link
        href="/members"
        className="rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800 md:px-6 md:py-3 md:text-base"
      >
        Explore Members
      </Link>
      <Link
        href="/contact"
        className="rounded-lg border border-blue-900 px-5 py-2.5 text-sm font-medium text-blue-900 transition hover:bg-blue-900 hover:text-white md:px-6 md:py-3 md:text-base"
      >
        Join Fellowship
      </Link>
    </div>
  );
}