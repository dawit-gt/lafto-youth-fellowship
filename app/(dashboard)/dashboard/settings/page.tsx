"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { ArrowLeft, Save } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [settings, setSettings] = useState({
    hero_badge: "",
    hero_title: "",
    hero_subtitle: "",
    about_title: "",
    about_paragraph1: "",
    about_paragraph2: "",
    contact_phone: "",
    contact_address: "",
    contact_telegram: "",
  });

  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");

      if (error) console.error(error);
      else {
        const map: Record<string, string> = {};
        data?.forEach((item) => {
          map[item.key] = item.value;
        });
        setSettings((prev) => ({ ...prev, ...map }));
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase
        .from("site_settings")
        .upsert(updates, { onConflict: "key" });

      if (error) throw error;
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Loading settings...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="mx-auto max-w-3xl">

        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-[#0B3D91] transition"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <h1 className="text-2xl font-bold text-slate-900 mb-8">Site Settings</h1>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        {success && (
          <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
            Settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">

          {/* Home Page */}
          <div className="rounded-2xl bg-white p-8 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-slate-900 border-b pb-3">
              Home Page
            </h2>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Hero Badge Text</label>
              <input
                name="hero_badge"
                value={settings.hero_badge}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Hero Title</label>
              <textarea
                name="hero_title"
                value={settings.hero_title}
                onChange={handleChange}
                rows={2}
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91] resize-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Hero Subtitle</label>
              <textarea
                name="hero_subtitle"
                value={settings.hero_subtitle}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91] resize-none"
              />
            </div>
          </div>

          {/* About Page */}
          <div className="rounded-2xl bg-white p-8 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-slate-900 border-b pb-3">
              About Page
            </h2>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">About Title</label>
              <input
                name="about_title"
                value={settings.about_title}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Paragraph 1</label>
              <textarea
                name="about_paragraph1"
                value={settings.about_paragraph1}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91] resize-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Paragraph 2</label>
              <textarea
                name="about_paragraph2"
                value={settings.about_paragraph2}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91] resize-none"
              />
            </div>
          </div>

          {/* Contact Page */}
          <div className="rounded-2xl bg-white p-8 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-slate-900 border-b pb-3">
              Contact Page
            </h2>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Phone Number</label>
              <input
                name="contact_phone"
                value={settings.contact_phone}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Address</label>
              <input
                name="contact_address"
                value={settings.contact_address}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Telegram Link</label>
              <input
                name="contact_telegram"
                value={settings.contact_telegram}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0B3D91] py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save All Settings"}
          </button>

        </form>
      </div>
    </main>
  );
}