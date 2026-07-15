"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { ArrowLeft, Upload } from "lucide-react";
import {
  ETHIOPIAN_MONTHS,
  ETHIOPIAN_DAYS,
  ETHIOPIAN_YEARS,
  calculateAgeFromEthiopian,
} from "@/lib/ethiopian-date";

const EDUCATION_LEVELS = [
  "Grade 1", "Grade 2", "Grade 3", "Grade 4",
  "Grade 5", "Grade 6", "Grade 7", "Grade 8",
  "Grade 9", "Grade 10", "Grade 11", "Grade 12",
  "University Year 1", "University Year 2", "University Year 3",
  "University Year 4", "University Year 5", "University Year 6",
  "University Year 7",
];

export default function AddMemberPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    gender: "Male",
    phone: "",
    status: "Student",
    education_level: "",
    occupation: "",
    bio: "",
  });

  const [birthday, setBirthday] = useState({
    day: "1",
    month: "1",
    year: "2000",
  });

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
      let photo_url = "";

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

      const birthdayString = `${birthday.day}/${birthday.month}/${birthday.year}`;
      const age = calculateAgeFromEthiopian(birthdayString);

      const { error: insertError } = await supabase.from("members").insert({
        full_name: form.full_name,
        gender: form.gender,
        age,
        phone: form.phone,
        status: form.status,
        education_level: form.education_level || null,
        occupation: form.occupation,
        bio: form.bio,
        photo_url,
        birthday: birthdayString,
      });

      if (insertError) throw insertError;

      router.push("/dashboard");
    } catch (err: unknown) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const previewAge = calculateAgeFromEthiopian(
    `${birthday.day}/${birthday.month}/${birthday.year}`
  );

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

        <h1 className="text-2xl font-bold text-slate-900 mb-8">Add New Member</h1>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="rounded-2xl bg-white p-8 shadow-sm space-y-6">

          {/* Photo Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="h-32 w-32 overflow-hidden rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <Upload className="text-slate-400" size={28} />
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

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Full Name *</label>
              <input
                name="full_name"
                required
                value={form.full_name}
                onChange={handleChange}
                placeholder="e.g. Michiale Solomon"
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            {/* Gender */}
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

            {/* Birthday - Ethiopian Calendar */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Birthday (Ethiopian Calendar) *
              </label>
              <div className="grid grid-cols-3 gap-3">
                <select
                  value={birthday.day}
                  onChange={(e) => setBirthday({ ...birthday, day: e.target.value })}
                  className="rounded-xl border px-3 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
                >
                  {ETHIOPIAN_DAYS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <select
                  value={birthday.month}
                  onChange={(e) => setBirthday({ ...birthday, month: e.target.value })}
                  className="rounded-xl border px-3 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
                >
                  {ETHIOPIAN_MONTHS.map((m, i) => (
                    <option key={i} value={i + 1}>{m}</option>
                  ))}
                </select>
                <select
                  value={birthday.year}
                  onChange={(e) => setBirthday({ ...birthday, year: e.target.value })}
                  className="rounded-xl border px-3 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
                >
                  {ETHIOPIAN_YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <p className="mt-2 text-sm text-[#0B3D91] font-medium">
                Age: {previewAge} years old
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Phone *</label>
              <input
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 0911234567"
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            {/* Status */}
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

            {/* Education Level */}
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

            {/* Occupation */}
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

            {/* Bio */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                placeholder="Short description about the member..."
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#0B3D91] py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {loading ? "Saving..." : "Add Member"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}