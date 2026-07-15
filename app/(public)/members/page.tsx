"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Member } from "@/types/member";
import MemberCard from "@/components/member/MemberCard";
import MemberSkeleton from "@/components/member/MemberSkeleton";
import Container from "@/components/layout/Container";
import { Search } from "lucide-react";

const STATUS_FILTERS = ["All", "Student", "Employed", "Unemployed"];

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [filtered, setFiltered] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");

  useEffect(() => {
    async function fetchMembers() {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("full_name", { ascending: true });

      if (error) console.error(error);
      else {
        setMembers(data || []);
        setFiltered(data || []);
      }
      setLoading(false);
    }
    fetchMembers();
  }, []);

  useEffect(() => {
    let result = members;

    if (activeStatus !== "All") {
      result = result.filter((m) => m.status === activeStatus);
    }

    if (search.trim() !== "") {
      result = result.filter((m) =>
        m.full_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, activeStatus, members]);

  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <Container>
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-[#0B3D91]">
            Our Members
          </span>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">
            Fellowship Members
          </h1>
          <p className="mt-3 text-slate-600">
            Meet the young people of Lafto Mekaneyesus Youth Fellowship
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border bg-white py-3 pl-12 pr-4 text-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-[#0B3D91]"
          />
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap gap-3">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                activeStatus === status
                  ? "bg-[#0B3D91] text-white"
                  : "bg-white text-slate-600 border hover:bg-slate-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Count */}
        {!loading && (
          <p className="mb-6 text-sm text-slate-500">
            Showing {filtered.length} member{filtered.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <MemberSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center text-slate-500">
            <p className="text-xl font-medium">No members found</p>
            <p className="mt-2 text-sm">Try a different search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}