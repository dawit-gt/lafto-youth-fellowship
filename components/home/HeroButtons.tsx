import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-4">
      <Link
        href="/members"
        className="rounded-lg bg-blue-900 px-6 py-3 text-white transition hover:bg-blue-800"
      >
        Explore Members
      </Link>

      <Link
        href="/contact"
        className="rounded-lg border border-blue-900 px-6 py-3 text-blue-900 transition hover:bg-blue-900 hover:text-white"
      >
        Join Fellowship
      </Link>
    </div>
  );
}