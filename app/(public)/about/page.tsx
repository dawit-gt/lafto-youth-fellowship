"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { Leader } from "@/types/leader";
import Container from "@/components/layout/Container";
import { Heart, Users, BookOpen, Star } from "lucide-react";

export default function AboutPage() {
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
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-[#0B3D91] py-24 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
              About Us
            </span>
            <h1 className="mt-6 text-4xl font-bold md:text-5xl">
              ሀያላን ሠራዊት ላፍቶ መካነ ኢየሱስ ወጣቶች
            </h1>
            <p className="mt-6 text-lg text-blue-100">
              EECMY Lafto Mekaneyesus Congregation Youth Fellowship —
              a community of young people growing together in faith,
              friendship, and service.
            </p>
          </div>
        </Container>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-[#0B3D91]">
                Who We Are
              </span>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">
                A Place Where Faith, Friendship and Service Meet.
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Lafto Mekaneyesus Youth Fellowship exists to help young people
                grow spiritually, discover their God-given gifts, build strong
                friendships and become faithful servants of Christ.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Through Bible studies, worship, outreach, leadership training,
                and community service, we strive to glorify God while
                supporting one another in every stage of life.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: BookOpen, title: "Bible Study", desc: "Growing in God's Word together every week." },
                { icon: Heart, title: "Worship", desc: "Praising God through songs and prayer." },
                { icon: Users, title: "Community", desc: "Building friendships that encourage spiritual growth." },
                { icon: Star, title: "Service", desc: "Serving the church and the community with love." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border p-6 shadow-sm">
                    <Icon className="h-8 w-8 text-[#0B3D91]" />
                    <h3 className="mt-3 font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-slate-50">
        <Container>
          <div className="mb-12 text-center">
            <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-[#0B3D91]">
              Leadership
            </span>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">
              Meet Our Leadership Team
            </h2>
            <p className="mt-3 text-slate-600">
              Dedicated leaders serving the fellowship with faith, humility, and commitment.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((leader) => (
              <div
                key={leader.id}
                className="rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full bg-slate-100">
                  {leader.photo_url ? (
                    <Image
                      src={leader.photo_url}
                      alt={leader.full_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-blue-50">
                      <span className="text-2xl font-bold text-[#0B3D91]">
                        {leader.full_name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="mt-4 font-bold text-slate-900">{leader.full_name}</h3>
                <p className="mt-1 text-sm font-medium text-[#0B3D91]">{leader.role}</p>
                {leader.phone && (
                  <p className="mt-2 text-sm text-slate-500">{leader.phone}</p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Church Info */}
      <section