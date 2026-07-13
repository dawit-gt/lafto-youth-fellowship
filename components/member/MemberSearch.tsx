"use client";

import { Search } from "lucide-react";

export default function MemberSearch() {
  return (
    <div className="relative">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        size={20}
      />

      <input
        type="text"
        placeholder="Search members..."
        className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-blue-700"
      />
    </div>
  );
}