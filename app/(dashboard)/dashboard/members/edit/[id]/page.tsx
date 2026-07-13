"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { ArrowLeft, Upload } from "lucide-react";

const EDUCATION_LEVELS = [
  "Grade 1", "Grade 2", "Grade 3", "Grade 4",
  "Grade 5", "Grade 6", "Grade 7", "Grade 8",
  "Grade 9", "Grade 10", "Grade 11", "Grade 12",
  "University Year 1", "University Year 2", "University Year 3",
  "University Year 4", "University Year 5",
];

export default function EditMemberPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    gender: "Male",
    age: "",
    phone: "",
    status: "Student",
    education_level: "",
    occupation: "",
    bio: "",
    photo_url: "",
  });

  useEffect(() => {
    async function fetchMember() {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setForm({
          full_name: data.full_name || "",
          gender: data.gender || "Male",
          age: data.age?.toString() || "",
          phone: data.phone || "",
          status: data.status || "Student",
          education_level: data.education_level || "",
          occupation: data.occupation || "",
          bio: data.bio || "",
          photo_url: data.photo_url || "",
        });
        setPhotoPreview(data.photo_url || "");
      }
      setFetching(false);
    }
    fetchMember();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let photo_url = form.photo_url;

      if (photoFile) {
        const fileExt = photoFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;

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
        .from("members")
        .update({
          full_name: form.full_name,
          gender: form.gender,
          age: parseInt(form.age),
          phone: form.phone,
          status: form.status,
          education_level: form.education_level || null,
          occupation: form.occupation,
          bio: form.bio,
          photo_url,
        })
        .eq("id", id);

      if (updateError) throw updateError;

      router.push("/dashboard");
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
        <p className="text-slate-500">Loading member...</p>
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
          Back to Dashboard
        </button>

        <h1 className="text-2xl font-bold text-slate-900 mb-8">Edit Member</h1>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="rounded-2xl bg-white p-8 shadow-sm space-y-6">

          {/* Photo */}
          <div className="flex flex-col items-center gap-4">
            <div className="h-32 w-32 overflow-hidden rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <Upload className="text-slate-400" size={28} />
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

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Full Name *</label>
              <input
                name="full_name"
                required
                value={form.full_name}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Gender *</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Age *</label>
                <input
                  name="age"
                  type="number"
                  required
                  min={5}
                  max={99}
                  value={form.age}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Phone *</label>
              <input
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Status *</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
              >
                <option>Student</option>
                <option>Employed</option>
                <option>Unemployed</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Education Level</label>
              <select
                name="education_level"
                value={form.education_level}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
              >
                <option value="">— Select —</option>
                {EDUCATION_LEVELS.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Occupation</label>
              <input
                name="occupation"
                value={form.occupation}
                onChange={handleChange}
                placeholder="e.g. Teacher, Engineer"
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91] resize-none"
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