"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { GalleryPhoto } from "@/types/gallery";
import Container from "@/components/layout/Container";
import { ArrowLeft } from "lucide-react";

export default function GalleryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [photo, setPhoto] = useState<GalleryPhoto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhoto() {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else setPhoto(data);
      setLoading(false);
    }
    fetchPhoto();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse h-64 w-full max-w-2xl rounded-2xl bg-slate-800" />
      </main>
    );
  }

  if (!photo) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Photo not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          Back to Gallery
        </button>
      </div>

      {/* Full image */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-3xl">
          <div className="relative w-full overflow-hidden rounded-2xl"
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src={photo.photo_url}
              alt={photo.caption || "Gallery photo"}
              fill
              className="object-contain"
              priority
            />
          </div>

          {photo.caption && (
            <p className="mt-4 text-center text-sm text-white/70 md:text-base">
              {photo.caption}
            </p>
          )}
        </div>
      </div>

    </main>
  );
}