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
    <section className="bg-white py-12 md:py-24">
      <Container>
        <SectionTitle
          badge="Leadership"
          title="Meet Our Leadership Team"
          description="Dedicated leaders serving the fellowship with faith, humility, and commitment."
        />

        <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="text-center rounded-2xl border p-4 shadow-sm transition hover:-translate-y-2 hover:shadow-lg md:p-6"
            >
              <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-full bg-slate-100 md:h-28 md:w-28">
                {leader.photo_url ? (
                  <Image
                    src={leader.photo_url}
                    alt={leader.full_name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-blue-50">
                    <span className="text-xl font-bold text-[#0B3D91] md:text-3xl">
                      {leader.full_name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900 md:mt-4 md:text-lg">
                {leader.full_name}
              </h3>
              <p className="mt-1 text-xs font-medium text-[#0B3D91] md:text-sm">
                {leader.role}
              </p>
              {leader.phone && (
                <p className="mt-1 text-xs text-slate-500 md:mt-2 md:text-sm">
                  {leader.phone}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}