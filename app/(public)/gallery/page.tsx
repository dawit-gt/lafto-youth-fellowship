"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { GalleryPhoto } from "@/types/gallery";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/layout/SectionTitle";

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setPhotos(data || []);
      }

      setLoading(false);
    }

    fetchPhotos();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 py-10 md:py-16">
      <Container>
        <SectionTitle
          badge="Gallery"
          title="Our Photo Gallery"
          description="A collection of moments from our fellowship, worship, and community life."
        />

        {loading ? (
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-600">
            <p className="text-lg font-medium">
              No gallery photos available yet.
            </p>
            <p className="mt-2 text-sm">Please check back soon for updates.</p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="relative h-72 w-full">
                  <Image
                    src={photo.photo_url}
                    alt={photo.caption || "Gallery photo"}
                    fill
                    className="object-cover"
                  />
                </div>
                {photo.caption ? (
                  <div className="p-4">
                    <p className="text-sm text-slate-700">{photo.caption}</p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
