"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { GalleryPhoto } from "@/types/gallery";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

export default function GalleryAdminPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setPhotos(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    const confirm = window.confirm("Delete this photo? This cannot be undone.");
    if (!confirm) return;

    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) alert("Error deleting photo.");
    else setPhotos((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="mx-auto max-w-5xl">

        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-[#0B3D91] transition"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Manage Gallery</h1>
          <button
            onClick={() => router.push("/dashboard/gallery/add")}
            className="flex items-center gap-2 rounded-xl bg-[#0B3D91] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            <Plus size={16} />
            Add Photo
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-slate-200 h-48" />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="py-24 text-center text-slate-500">
            <p className="text-xl font-medium">No photos yet.</p>
            <p className="mt-2 text-sm">Add your first photo to the gallery.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative overflow-hidden rounded-2xl bg-slate-100">
                <div className="relative h-48 w-full">
                  <Image
                    src={photo.photo_url}
                    alt={photo.caption || "Gallery photo"}
                    fill
                    className="object-cover"
                  />
                </div>
                {photo.caption && (
                  <p className="px-3 py-2 text-sm text-slate-600">{photo.caption}</p>
                )}
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="absolute right-2 top-2 rounded-lg bg-red-500 p-2 text-white opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}