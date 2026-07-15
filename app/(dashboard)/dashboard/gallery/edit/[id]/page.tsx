"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { ArrowLeft, Upload } from "lucide-react";
import Image from "next/image";

export default function EditPhotoPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState("");

  useEffect(() => {
    async function fetchPhoto() {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else {
        setCaption(data.caption || "");
        setCurrentPhotoUrl(data.photo_url || "");
        setPhotoPreview(data.photo_url || "");
      }
      setFetching(false);
    }
    fetchPhoto();
  }, [id]);

  const MAX_SIZE_MB = 5;

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`Image is too large. Maximum size is ${MAX_SIZE_MB}MB.`);
        e.target.value = "";
        return;
      }
      setError("");
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let photo_url = currentPhotoUrl;

      if (photoFile) {
        const fileExt = photoFile.name.split(".").pop();
        const fileName = `gallery/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("member-photos")
          .upload(fileName, photoFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("member-photos")
          .getPublicUrl(fileName);

        photo_url = urlData.publicUrl;
      }

      const { error: updateError } = await supabase
        .from("gallery")
        .update({ photo_url, caption })
        .eq("id", id);

      if (updateError) throw updateError;

      router.push("/dashboard/gallery");
    } catch (err: unknown) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="mx-auto max-w-2xl">

        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-[#0B3D91] transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <h1 className="text-2xl font-bold text-slate-900 mb-8">Edit Photo</h1>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Photo</label>
              <div className="flex flex-col items-center gap-4">
                <div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-100 border-2 border-dashed border-slate-300">
                  {photoPreview ? (
                    <Image
                      src={photoPreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Upload className="text-slate-400" size={32} />
                    </div>
                  )}
                </div>
                <label className="cursor-pointer rounded-lg border px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Caption (optional)</label>
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Youth worship night 2024"
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#0B3D91] py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}