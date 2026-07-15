"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
    <main className="min-h-screen bg-slate-50 py-10 md:py-16">
      <Container>
        <div className="mb-8 text-center md:mb-10">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-[#0B3D91] md:px-4 md:text-sm">
            Gallery
          </span>
          <h1 className="mt-3 text-2xl font-bold text-slate-900 md:mt-4 md:text-4xl">
            Life in Our Fellowship
          </h1>
          <p className="mt-2 text-sm text-slate-600 md:mt-3 md:text-base">
            Moments of worship, fellowship, service, and community.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-slate-200 h-40 md:h-64" />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="py-24 text-center text-slate-500">
            <p className="text-lg font-medium md:text-xl">No photos yet</p>
            <p className="mt-2 text-sm">Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {photos.map((photo) => (
              <Link
                key={photo.id}
                href={`/gallery/${photo.id}`}
                className="group block overflow-hidden rounded-2xl bg-slate-100"
              >
                <div className="relative h-40 w-full md:h-64">
                  <Image
                    src={photo.photo_url}
                    alt={photo.caption || "Gallery photo"}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
                </div>
                {photo.caption && (
                  <p className="px-3 py-2 text-xs text-slate-600 md:px-4 md:py-3 md:text-sm">
                    {photo.caption}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}