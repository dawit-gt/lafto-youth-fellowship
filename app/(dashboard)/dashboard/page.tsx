"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Member } from "@/types/member";
import {
  Users, GraduationCap, Briefcase, UserX,
  LogOut, Plus, Pencil, Trash2, Search, Menu, X,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [filtered, setFiltered] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState("first_az");

  function sortMembers(list: Member[]): Member[] {
    return [...list].sort((a, b) => {
      switch (sortBy) {
        case "first_az":
          return a.full_name.split(" ")[0].localeCompare(b.full_name.split(" ")[0]);
        case "last_az": {
          const aLast = a.full_name.split(" ").slice(-1)[0];
          const bLast = b.full_name.split(" ").slice(-1)[0];
          return aLast.localeCompare(bLast);
        }
        case "age_asc":
          return a.age - b.age;
        case "age_desc":
          return b.age - a.age;
        default:
          return 0;
      }
    });
  }

  useEffect(() => {
    checkAuth();
    fetchMembers();
  }, []);

  useEffect(() => {
    let result = members;
    if (activeStatus !== "All") {
      result = result.filter((m) => m.status === activeStatus);
    }
    if (search.trim() !== "") {
      result = result.filter((m) =>
        m.full_name.toLowerCase().includes(search.toLowerCase()) ||
        m.phone.includes(search)
      );
    }
    result = sortMembers(result);
    setFiltered(result);
  }, [search, activeStatus, sortBy, members]);

  async function checkAuth() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) router.push("/login");
  }

  async function fetchMembers() {
    const { data, error } = await supabase
      .from("members")
      .select("*");
    if (error) console.error(error);
    else {
      setMembers(data || []);
      setFiltered(data || []);
    }
    setLoading(false);
  }

  async function handleDelete(id: string, name: string) {
    const confirm = window.confirm(`Delete ${name}? This cannot be undone.`);
    if (!confirm) return;
    const { error } = await supabase.from("members").delete().eq("id", id);
    if (error) alert("Error deleting member.");
    else setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const total = members.length;
  const students = members.filter((m) => m.status === "Student").length;
  const employed = members.filter((m) => m.status === "Employed").length;
  const unemployed = members.filter((m) => m.status === "Unemployed").length;

  const navItems = [
    { label: "Add Member", action: () => router.push("/dashboard/members/add"), primary: true },
    { label: "Leaders", action: () => router.push("/dashboard/leaders") },
    { label: "Events", action: () => router.push("/dashboard/events") },
    { label: "Gallery", action: () => router.push("/dashboard/gallery") },
    { label: "Admins", action: () => router.push("/dashboard/admins") },
    { label: "Settings", action: () => router.push("/dashboard/settings") },
  ];

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Top Bar */}
      <div className="relative bg-white border-b px-4 py-3 flex items-center justify-between md:px-6 md:py-4">
        <div>
          <h1 className="text-base font-bold text-slate-900 md:text-xl">Admin Dashboard</h1>
          <p className="text-xs text-slate-500 md:text-sm">Lafto Mekaneyesus Youth Fellowship</p>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
                item.primary
                  ? "bg-[#0B3D91] text-white hover:bg-blue-700"
                  : "border text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.primary && <Plus size={16} />}
              {item.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute right-4 top-14 w-48 rounded-xl bg-white border shadow-lg z-50 py-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => { item.action(); setMenuOpen(false); }}
                className={`w-full px-4 py-2.5 text-sm font-medium text-left transition hover:bg-slate-50 ${
                  item.primary ? "text-[#0B3D91]" : "text-slate-600"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t mt-1 pt-1">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 space-y-6 md:p-6 md:space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 md:gap-4">
          {[
            { label: "Total Members", value: total, icon: Users, color: "bg-blue-50 text-[#0B3D91]" },
            { label: "Students", value: students, icon: GraduationCap, color: "bg-green-50 text-green-700" },
            { label: "Employed", value: employed, icon: Briefcase, color: "bg-purple-50 text-purple-700" },
            { label: "Unemployed", value: unemployed, icon: UserX, color: "bg-orange-50 text-orange-700" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
                <div className={`inline-flex rounded-xl p-2 md:p-3 ${stat.color}`}>
                  <Icon size={18} />
                </div>
                <p className="mt-3 text-2xl font-bold text-slate-900 md:mt-4 md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-500 md:text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Members Table */}
        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b flex items-center justify-between md:px-6 md:py-4">
            <h2 className="text-sm font-semibold text-slate-900 md:text-base">All Members</h2>
            <span className="text-xs text-slate-500 md:text-sm">
              {filtered.length} of {total}
            </span>
          </div>

          {/* Search, Sort and Filter */}
          <div className="px-4 py-3 border-b space-y-3 md:px-6">
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="Search by name or phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border py-2 pl-8 pr-4 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[#0B3D91] md:text-sm"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border bg-white px-2 py-2 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-[#0B3D91] md:text-sm shrink-0"
              >
                <option value="first_az">First Name (A-Z)</option>
                <option value="last_az">Last Name (A-Z)</option>
                <option value="age_asc">Age (Youngest)</option>
                <option value="age_desc">Age (Oldest)</option>
              </select>
            </div>
            <div className="flex gap-2 flex-wrap">
              {["All", "Student", "Employed", "Unemployed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    activeStatus === status
                      ? "bg-[#0B3D91] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-500 text-sm">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">No members found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium md:px-6">Name</th>
                    <th className="px-4 py-3 text-left font-medium md:px-6">Gender</th>
                    <th className="px-4 py-3 text-left font-medium md:px-6">Age</th>
                    <th className="px-4 py-3 text-left font-medium md:px-6">Status</th>
                    <th className="hidden px-4 py-3 text-left font-medium md:table-cell md:px-6">Education</th>
                    <th className="hidden px-4 py-3 text-left font-medium md:table-cell md:px-6">Phone</th>
                    <th className="px-4 py-3 text-left font-medium md:px-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-medium text-slate-900 md:px-6 md:py-4">{member.full_name}</td>
                      <td className="px-4 py-3 text-slate-600 md:px-6 md:py-4">{member.gender}</td>
                      <td className="px-4 py-3 text-slate-600 md:px-6 md:py-4">{member.age}</td>
                      <td className="px-4 py-3 md:px-6 md:py-4">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                          member.status === "Student"
                            ? "bg-blue-100 text-blue-700"
                            : member.status === "Employed"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 text-slate-600 md:table-cell md:px-6 md:py-4">{member.education_level || "—"}</td>
                      <td className="hidden px-4 py-3 text-slate-600 md:table-cell md:px-6 md:py-4">{member.phone}</td>
                      <td className="px-4 py-3 md:px-6 md:py-4">
                        <div className="flex items-center gap-1 md:gap-2">
                          <button
                            onClick={() => router.push(`/dashboard/members/edit/${member.id}`)}
                            className="rounded-lg p-1.5 text-slate-600 hover:bg-blue-50 hover:text-[#0B3D91] transition md:p-2"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id, member.full_name)}
                            className="rounded-lg p-1.5 text-slate-600 hover:bg-red-50 hover:text-red-600 transition md:p-2"
                          >
                            <Trash2 size={14} />
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