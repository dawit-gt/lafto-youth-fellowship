"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { Leader } from "@/types/leader";
import Container from "@/components/layout/Container";
import { Heart, Users, BookOpen, Star } from "lucide-react";

export default function AboutPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [settings, setSettings] = useState({
    about_title: "A Place Where Faith, Friendship and Service Meet.",
    about_paragraph1:
      "Lafto Mekaneyesus Youth Fellowship exists to help young people grow spiritually, discover their God-given gifts, build strong friendships and become faithful servants of Christ.",
    about_paragraph2:
      "Through Bible studies, worship, outreach, leadership training, and community service, we strive to glorify God while supporting one another in every stage of life.",
  });

  useEffect(() => {
    async function fetchData() {
      const [leadersRes, settingsRes] = await Promise.all([
        supabase
          .from("leaders")
          .select("*")
          .order("order_index", { ascending: true }),
        supabase
          .from("site_settings")
          .select("key, value")
          .in("key", ["about_title", "about_paragraph1", "about_paragraph2"]),
      ]);
      if (leadersRes.data) setLeaders(leadersRes.data);
      if (settingsRes.data) {
        const map: Record<string, string> = {};
        settingsRes.data.forEach((item) => {
          map[item.key] = item.value;
        });
        setSettings((prev) => ({ ...prev, ...map }));
      }
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-[#0B3D91] py-12 text-white md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium md:px-4 md:text-sm">
              About Us
            </span>
            <h1 className="mt-4 text-2xl font-bold md:mt-6 md:text-5xl">
              ሀያላን ሠራዊት ላፍቶ መካነ ኢየሱስ ወጣቶች
            </h1>
            <p className="mt-4 text-sm text-blue-100 md:mt-6 md:text-lg">
              EECMY Lafto Mekaneyesus Congregation Youth Fellowship — a
              community of young people growing together in faith, friendship,
              and service.
            </p>
          </div>
        </Container>
      </section>

      {/* Who We Are */}
      <section className="py-10 bg-white md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-[#0B3D91] md:text-sm">
                Who We Are
              </span>
              <h2 className="mt-3 text-xl font-bold text-slate-900 md:mt-4 md:text-3xl">
                {settings.about_title}
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed md:mt-4 md:text-base">
                {settings.about_paragraph1}
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed md:mt-4 md:text-base">
                {settings.about_paragraph2}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                {
                  icon: BookOpen,
                  title: "Bible Study",
                  desc: "Growing in God's Word together every week.",
                },
                {
                  icon: Heart,
                  title: "Worship",
                  desc: "Praising God through songs and prayer.",
                },
                {
                  icon: Users,
                  title: "Community",
                  desc: "Building friendships that encourage spiritual growth.",
                },
                {
                  icon: Star,
                  title: "Service",
                  desc: "Serving the church and the community with love.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border p-4 shadow-sm md:p-6"
                  >
                    <Icon className="h-6 w-6 text-[#0B3D91] md:h-8 md:w-8" />
                    <h3 className="mt-2 text-sm font-bold text-slate-900 md:mt-3 md:text-base">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 md:text-sm">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="py-10 bg-slate-50 md:py-24">
        <Container>
          <div className="mb-8 text-center md:mb-12">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-[#0B3D91] md:text-sm">
              Leadership
            </span>
            <h2 className="mt-3 text-xl font-bold text-slate-900 md:mt-4 md:text-3xl">
              Meet Our Leadership Team
            </h2>
            <p className="mt-2 text-sm text-slate-600 md:mt-3 md:text-base">
              Dedicated leaders serving the fellowship with faith, humility, and
              commitment.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4">
            {leaders.map((leader) => (
              <div
                key={leader.id}
                className="rounded-2xl border bg-white p-4 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg md:p-6"
              >
                <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-full bg-slate-100 md:h-24 md:w-24">
                  {leader.photo_url ? (
                    <Image
                      src={leader.photo_url}
                      alt={leader.full_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-blue-50">
                      <span className="text-xl font-bold text-[#0B3D91] md:text-2xl">
                        {leader.full_name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="mt-3 text-xs font-bold text-slate-900 md:mt-4 md:text-base">
                  {leader.full_name}
                </h3>
                <p className="mt-1 text-xs font-medium text-[#0B3D91]">
                  {leader.role}
                </p>
                {leader.phone && (
                  <p className="mt-1 text-xs text-slate-500 md:mt-2">
                    {leader.phone}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Church Info */}
      <section className="py-10 bg-white md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-[#0B3D91] md:text-sm">
              Our Church
            </span>
            <h2 className="mt-3 text-xl font-bold text-slate-900 md:mt-4 md:text-3xl">
              EECMY Lafto Mekaneyesus Congregation
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed md:mt-4 md:text-base">
              We are part of the Ethiopian Evangelical Church Mekane Yesus, one
              of the largest Lutheran churches in the world. Our congregation is
              located in the Lafto area of Addis Ababa, Ethiopia.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 text-slate-600 md:mt-8">
              <p className="text-sm">Lafto, Addis Ababa, Ethiopia</p>
              <p className="text-sm">0950236535</p>

              <a
                href="https://t.me/+_ylPiiNclAVhZTQ0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-[#229ED9] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1a8dbf] transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.67l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.941z" />
                </svg>
                Join our Telegram Group
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
