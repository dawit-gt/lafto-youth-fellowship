import Link from "next/link";
import Container from "@/components/layout/Container";

export default function CTA() {
  return (
    <section className="bg-[#0B3D91] py-24 text-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold">
            Become Part of Our Fellowship
          </h2>

          <p className="mt-6 text-lg text-blue-100">
            Worship with us, grow in faith, build meaningful friendships,
            and serve our community together.
          </p>

          <Link
            href="/contact"
            className="mt-10 inline-block rounded-xl bg-white px-8 py-3 font-medium text-[#0B3D91] hover:bg-blue-50 transition"
          >
            Contact Us
          </Link>
        </div>
      </Container>
    </section>
  );
}