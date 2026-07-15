"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Member } from "@/types/member";
import MemberCard from "@/components/member/MemberCard";
import MemberSkeleton from "@/components/member/MemberSkeleton";
import Container from "@/components/layout/Container";
import { Search } from "lucide-react";

const STATUS_FILTERS = ["All", "Student", "Employed", "Unemployed"];

const SORT_OPTIONS = [
  { label: "First Name (A-Z)", value: "first_az" },
  { label: "Last Name (A-Z)", value: "last_az" },
  { label: "Age (Youngest first)", value: "age_asc" },
  { label: "Age (Oldest first)", value: "age_desc" },
];

function sortMembers(members: Member[], sort: string): Member[] {
  return [...members].sort((a, b) => {
    switch (sort) {
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

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [filtered, setFiltered] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [sortBy, setSortBy] = useState("first_az");

  useEffect(() => {
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

    result = sortMembers(result, sortBy);
    setFiltered(result);
  }, [search, activeStatus, sortBy, members]);

  return (
    <main className="min-h-screen bg-slate-50 py-10 md:py-16">
      <Container>
        {/* Header */}
        <div className="mb-8 text-center md:mb-10">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-[#0B3D91] md:px-4 md:text-sm">
            Our Members
          </span>
          <h1 className="mt-3 text-2xl font-bold text-slate-900 md:mt-4 md:text-4xl">
            Fellowship Members
          </h1>
          <p className="mt-2 text-sm text-slate-600 md:mt-3 md:text-base">
            Meet the young people of Lafto Mekaneyesus Youth Fellowship
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-[#0B3D91]"
          />
        </div>

        {/* Filters + Sort */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition md:text-sm ${
                  activeStatus === status
                    ? "bg-[#0B3D91] text-white"
                    : "bg-white text-slate-600 border hover:bg-slate-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border bg-white px-3 py-1.5 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-[#0B3D91] md:text-sm"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Count */}
        {!loading && (
          <p className="mb-4 text-xs text-slate-500 md:text-sm">
            Showing {filtered.length} member{filtered.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <MemberSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center text-slate-500">
            <p className="text-lg font-medium">No members found</p>
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