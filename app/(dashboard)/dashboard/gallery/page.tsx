"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { GalleryPhoto } from "@/types/gallery";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
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
    <main className="min-h-screen bg-slate-50 py-6 px-4 md:py-10">
      <div className="mx-auto max-w-5xl">

        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-[#0B3D91] transition"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-900 md:text-2xl">Manage Gallery</h1>
          <button
            onClick={() => router.push("/dashboard/gallery/add")}
            className="flex items-center gap-2 rounded-xl bg-[#0B3D91] px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 transition md:px-4 md:text-sm"
          >
            <Plus size={14} />
            Add Photo
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-slate-200 h-40 md:h-48" />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="py-24 text-center text-slate-500">
            <p className="text-lg font-medium">No photos yet.</p>
            <p className="mt-2 text-sm">Add your first photo to the gallery.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="overflow-hidden rounded-2xl bg-slate-100">
                <div className="relative h-40 w-full md:h-48">
                  <Image
                    src={photo.photo_url}
                    alt={photo.caption || "Gallery photo"}
                    fill
                    className="object-cover"
                  />
                </div>

                {photo.caption && (
                  <p className="px-3 py-1.5 text-xs text-slate-600 md:px-3 md:py-2 md:text-sm">
                    {photo.caption}
                  </p>
                )}

                {/* Action buttons — always visible on mobile, hover on desktop */}
                <div className="flex gap-2 px-3 pb-3 md:pb-3">
                  <button
                    onClick={() => router.push(`/dashboard/gallery/edit/${photo.id}`)}
                    className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-blue-50 py-1.5 text-xs font-medium text-[#0B3D91] hover:bg-blue-100 transition"
                  >
                    <Pencil size={13} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-red-50 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}