"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Eye, EyeOff } from "lucide-react";

interface Admin {
  id: string;
  email: string;
  created_at: string;
}

export default function AdminsPage() {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  async function fetchAdmins() {
    const res = await fetch("/api/admins");
    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      setAdmins(data.map((u: Admin) => ({
        id: u.id,
        email: u.email,
        created_at: u.created_at,
      })));
    }
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const res = await fetch("/api/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      setSuccess(`Admin ${form.email} added successfully.`);
      setForm({ email: "", password: "" });
      setShowForm(false);
      fetchAdmins();
    }
    setSaving(false);
  }

  async function handleDelete(id: string, email: string) {
    const confirm = window.confirm(`Remove admin ${email}? They will lose dashboard access.`);
    if (!confirm) return;

    const res = await fetch("/api/admins", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      setAdmins((prev) => prev.filter((a) => a.id !== id));
      setSuccess(`Admin ${email} removed.`);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 py-6 px-4 md:py-10">
      <div className="mx-auto max-w-2xl">

        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-[#0B3D91] transition"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-900 md:text-2xl">Manage Admins</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-xl bg-[#0B3D91] px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 transition md:px-4 md:text-sm"
          >
            <Plus size={14} />
            Add Admin
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">{success}</div>
        )}

        {/* Add Admin Form */}
        {showForm && (
          <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-8">
            <h2 className="mb-4 text-base font-bold text-slate-900">Add New Admin</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700 md:text-sm">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@example.com"
                  className="w-full rounded-xl border px-4 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700 md:text-sm">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Min 6 characters"
                    className="w-full rounded-xl border px-4 py-2.5 pr-10 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-[#0B3D91] py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition"
                >
                  {saving ? "Adding..." : "Add Admin"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Admins List */}
        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500 text-sm">Loading...</div>
          ) : admins.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">No admins found.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {admins.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between p-4 md:p-6">
                  <div>
                    <p className="text-sm font-medium text-slate-900 md:text-base">
                      {admin.email}
                    </p>
                    <p className="text-xs text-slate-500 md:text-sm">
                      Added {new Date(admin.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(admin.id, admin.email)}
                    className="rounded-lg p-2 text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}