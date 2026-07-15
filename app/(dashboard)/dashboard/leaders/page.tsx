"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Leader } from "@/types/leader";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

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
    <main className="min-h-screen bg-slate-50 py-6 px-4 md:py-10">
      <div className="mx-auto max-w-4xl">

        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-[#0B3D91] transition"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-900 md:text-2xl">Manage Leaders</h1>
          <button
            onClick={() => router.push("/dashboard/leaders/add")}
            className="flex items-center gap-2 rounded-xl bg-[#0B3D91] px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 transition md:px-4 md:text-sm"
          >
            <Plus size={14} />
            Add Leader
          </button>
        </div>

        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500 text-sm">Loading...</div>
          ) : leaders.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">No leaders yet.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {leaders.map((leader) => (
                <div key={leader.id} className="flex items-center gap-3 p-4 md:p-6">

                  {/* Photo */}
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-100 md:h-14 md:w-14">
                    {leader.photo_url ? (
                      <Image
                        src={leader.photo_url}
                        alt={leader.full_name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-blue-50">
                        <span className="text-sm font-bold text-[#0B3D91]">
                          {leader.full_name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 md:text-base">
                      {leader.full_name}
                    </p>
                    <p className="text-xs text-[#0B3D91] md:text-sm">{leader.role}</p>
                    {leader.phone && (
                      <p className="text-xs text-slate-500">{leader.phone}</p>
                    )}
                  </div>

                  {/* Order badge */}
                  <span className="hidden shrink-0 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500 md:inline-block">
                    #{leader.order_index}
                  </span>

                  {/* Actions — always visible */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => router.push(`/dashboard/leaders/edit/${leader.id}`)}
                      className="rounded-lg p-2 text-slate-600 hover:bg-blue-50 hover:text-[#0B3D91] transition"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(leader.id, leader.full_name)}
                      className="rounded-lg p-2 text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}