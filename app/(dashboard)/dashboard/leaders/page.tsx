"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Leader } from "@/types/leader";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";

export default function LeadersAdminPage() {
  const router = useRouter();
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaders();
  }, []);

  async function fetchLeaders() {
    const { data, error } = await supabase
      .from("leaders")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) console.error(error);
    else setLeaders(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string, name: string) {
    const confirm = window.confirm(`Delete ${name}? This cannot be undone.`);
    if (!confirm) return;

    const { error } = await supabase.from("leaders").delete().eq("id", id);
    if (error) alert("Error deleting leader.");
    else setLeaders((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="mx-auto max-w-4xl">

        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-[#0B3D91] transition"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Manage Leaders</h1>
          <button
            onClick={() => router.push("/dashboard/leaders/add")}
            className="flex items-center gap-2 rounded-xl bg-[#0B3D91] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            <Plus size={16} />
            Add Leader
          </button>
        </div>

        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading...</div>
          ) : leaders.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No leaders yet.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Order</th>
                  <th className="px-6 py-3 text-left font-medium">Name</th>
                  <th className="px-6 py-3 text-left font-medium">Role</th>
                  <th className="px-6 py-3 text-left font-medium">Phone</th>
                  <th className="px-6 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leaders.map((leader) => (
                  <tr key={leader.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 text-slate-600">{leader.order_index}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{leader.full_name}</td>
                    <td className="px-6 py-4 text-slate-600">{leader.role}</td>
                    <td className="px-6 py-4 text-slate-600">{leader.phone || "—"}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/dashboard/leaders/edit/${leader.id}`)}
                          className="rounded-lg p-2 text-slate-600 hover:bg-blue-50 hover:text-[#0B3D91] transition"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(leader.id, leader.full_name)}
                          className="rounded-lg p-2 text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}