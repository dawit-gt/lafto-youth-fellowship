"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { GalleryPhoto } from "@/types/gallery";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/layout/SectionTitle";

export default function Gallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);

  useEffect(() => {
    async function fetchPhotos() {
      const { data } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);
      setPhotos(data || []);
    }
    fetchPhotos();
  }, []);

  if (photos.length === 0) return null;

  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <SectionTitle
          badge="Gallery"
          title="Life in Our Fellowship"
          description="Moments of worship, fellowship, service, and community."
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group overflow-hidden rounded-2xl bg-slate-100"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={photo.photo_url}
                  alt={photo.caption || "Gallery photo"}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
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