"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { Leader } from "@/types/leader";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/layout/SectionTitle";

export default function Leadership() {
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    async function fetchLeaders() {
      const { data } = await supabase
        .from("leaders")
        .select("*")
        .order("order_index", { ascending: true });
      setLeaders(data || []);
    }
    fetchLeaders();
  }, []);

  return (
    <section className="bg-white py-24">
      <Container>
        <SectionTitle
          badge="Leadership"
          title="Meet Our Leadership Team"
          description="Dedicated leaders serving the fellowship with faith, humility, and commitment."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="group text-center rounded-2xl border p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full bg-slate-100">
                {leader.photo_url ? (
                  <Image
                    src={leader.photo_url}
                    alt={leader.full_name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-blue-50">
                    <span className="text-3xl font-bold text-[#0B3D91]">
                      {leader.full_name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                {leader.full_name}
              </h3>
              <p className="mt-1 text-sm font-medium text-[#0B3D91]">
                {leader.role}
              </p>
              {leader.phone && (
                <p className="mt-2 text-sm text-slate-500">{leader.phone}</p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}