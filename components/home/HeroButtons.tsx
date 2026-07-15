import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-3 md:mt-10 md:gap-4">
      <Link
        href="/members"
        className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-900 shadow-lg transition duration-300 hover:bg-gray-100 md:px-6 md:py-3 md:text-base"
      >
        Explore Members
      </Link>

      <Link
        href="/contact"
        className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-white hover:text-blue-900 md:px-6 md:py-3 md:text-base"
      >
        Join Fellowship
      </Link>
    </div>
  );
}