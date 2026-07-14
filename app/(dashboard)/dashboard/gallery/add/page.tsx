"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { ArrowLeft, Upload } from "lucide-react";

export default function AddPhotoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [caption, setCaption] = useState("");

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!photoFile) {
      setError("Please select a photo.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const fileExt = photoFile.name.split(".").pop();
      const fileName = `gallery/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("member-photos")
        .upload(fileName, photoFile);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("member-photos")
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase.from("gallery").insert({
        photo_url: urlData.publicUrl,
        caption,
      });

      if (insertError) throw insertError;

      router.push("/dashboard/gallery");
    } catch (err: unknown) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
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

        <h1 className="text-2xl font-bold text-slate-900 mb-8">Add Photo</h1>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Photo Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Photo *</label>
              <div className="flex flex-col items-center gap-4">
                <div className="h-64 w-full overflow-hidden rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto text-slate-400" size={32} />
                      <p className="mt-2 text-sm text-slate-500">Click to upload a photo</p>
                    </div>
                  )}
                </div>
                <label className="cursor-pointer rounded-lg border px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition">
                  Choose Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Caption */}
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
              {loading ? "Uploading..." : "Upload Photo"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}