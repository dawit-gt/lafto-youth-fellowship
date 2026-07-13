import Link from "next/link";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

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

          <Button
            asChild
            variant="secondary"
            className="mt-10"
          >
            <Link href="/contact">
              Contact Us
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}