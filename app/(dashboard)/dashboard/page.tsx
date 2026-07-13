"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Member } from "@/types/member";
import {
  Users,
  GraduationCap,
  Briefcase,
  UserX,
  LogOut,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchMembers();
  }, []);

  async function checkAuth() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      router.push("/login");
    }
  }

  async function fetchMembers() {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("full_name", { ascending: true });

    if (error) console.error(error);
    else setMembers(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string, name: string) {
    const confirm = window.confirm(`Delete ${name}? This cannot be undone.`);
    if (!confirm) return;

    const { error } = await supabase.from("members").delete().eq("id", id);
    if (error) {
      alert("Error deleting member.");
    } else {
      setMembers((prev) => prev.filter((m) => m.id !== id));
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const total = members.length;
  const students = members.filter((m) => m.status === "Student").length;
  const employed = members.filter((m) => m.status === "Employed").length;
  const unemployed = members.filter((m) => m.status === "Unemployed").length;

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Top Bar */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-sm text-slate-500">Lafto Mekaneyesus Youth Fellowship</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard/members/add")}
            className="flex items-center gap-2 rounded-xl bg-[#0B3D91] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            <Plus size={16} />
            Add Member
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Total Members", value: total, icon: Users, color: "bg-blue-50 text-[#0B3D91]" },
            { label: "Students", value: students, icon: GraduationCap, color: "bg-green-50 text-green-700" },
            { label: "Employed", value: employed, icon: Briefcase, color: "bg-purple-50 text-purple-700" },
            { label: "Unemployed", value: unemployed, icon: UserX, color: "bg-orange-50 text-orange-700" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className={`inline-flex rounded-xl p-3 ${stat.color}`}>
                  <Icon size={22} />
                </div>
                <p className="mt-4 text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Members Table */}
        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">All Members</h2>
            <span className="text-sm text-slate-500">{total} total</span>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading...</div>
          ) : members.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No members yet. Add your first member.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium">Name</th>
                    <th className="px-6 py-3 text-left font-medium">Gender</th>
                    <th className="px-6 py-3 text-left font-medium">Age</th>
                    <th className="px-6 py-3 text-left font-medium">Status</th>
                    <th className="px-6 py-3 text-left font-medium">Education</th>
                    <th className="px-6 py-3 text-left font-medium">Phone</th>
                    <th className="px-6 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {members.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 font-medium text-slate-900">{member.full_name}</td>
                      <td className="px-6 py-4 text-slate-600">{member.gender}</td>
                      <td className="px-6 py-4 text-slate-600">{member.age}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                          member.status === "Student"
                            ? "bg-blue-100 text-blue-700"
                            : member.status === "Employed"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{member.education_level || "—"}</td>
                      <td className="px-6 py-4 text-slate-600">{member.phone}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => router.push(`/dashboard/members/edit/${member.id}`)}
                            className="rounded-lg p-2 text-slate-600 hover:bg-blue-50 hover:text-[#0B3D91] transition"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id, member.full_name)}
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
            </div>
          )}
        </div>
      </div>
    </main>
  );
}