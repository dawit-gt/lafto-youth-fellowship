"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { GalleryPhoto } from "@/types/gallery";
import Container from "@/components/layout/Container";

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      const { data } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });
      setPhotos(data || []);
      setLoading(false);
    }
    fetchPhotos();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <Container>
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-[#0B3D91]">
            Gallery
          </span>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">
            Life in Our Fellowship
          </h1>
          <p className="mt-3 text-slate-600">
            Moments of worship, fellowship, service, and community.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl bg-slate-200 h-64"
              />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="py-24 text-center text-slate-500">
            <p className="text-xl font-medium">No photos yet</p>
            <p className="mt-2 text-sm">Check back soon.</p>
          </div>
        ) : (
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
                {photo.caption && (
                  <p className="px-4 py-3 text-sm text-slate-600">
                    {photo.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}