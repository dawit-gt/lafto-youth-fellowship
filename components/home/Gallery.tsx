import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/layout/SectionTitle";

const images = [
  "/gallery/gallery-1.jpg",
  "/gallery/gallery-2.jpg",
  "/gallery/gallery-3.jpg",
  "/gallery/gallery-4.jpg",
  "/gallery/gallery-5.jpg",
  "/gallery/gallery-6.jpg",
];

export default function Gallery() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <SectionTitle
          badge="Gallery"
          title="Life in Our Fellowship"
          description="Moments of worship, fellowship, service, and community."
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-2xl"
            >
              <Image
                src={image}
                alt={`Gallery ${index + 1}`}
                width={500}
                height={500}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-block rounded-xl bg-[#0B3D91] px-8 py-3 font-medium text-white hover:bg-blue-700 transition"
          >
            View Full Gallery
          </Link>
        </div>
      </Container>
    </section>
  );
}