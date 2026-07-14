"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/layout/SectionTitle";
import { Users, GraduationCap, Briefcase, CalendarDays } from "lucide-react";

export default function Statistics() {
  const [stats, setStats] = useState({
    total: 0,
    students: 0,
    employed: 0,
    events: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const [membersRes, eventsRes] = await Promise.all([
        supabase.from("members").select("status"),
        supabase.from("events").select("id"),
      ]);

      const members = membersRes.data || [];
      const events = eventsRes.data || [];

      setStats({
        total: members.length,
        students: members.filter((m) => m.status === "Student").length,
        employed: members.filter((m) => m.status === "Employed").length,
        events: events.length,
      });
    }
    fetchStats();
  }, []);

  const items = [
    { title: "Members", value: stats.total, icon: Users },
    { title: "Students", value: stats.students, icon: GraduationCap },
    { title: "Employed", value: stats.employed, icon: Briefcase },
    { title: "Events", value: stats.events, icon: CalendarDays },
  ];

  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionTitle
          badge="Community"
          title="Our Fellowship in Numbers"
          description="Real-time statistics from our fellowship database."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
              >
                <Icon className="mx-auto h-12 w-12 text-[#0B3D91]" />
                <h3 className="mt-6 text-5xl font-bold text-slate-900">
                  {item.value}
                </h3>
                <p className="mt-3 text-slate-600">{item.title}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}