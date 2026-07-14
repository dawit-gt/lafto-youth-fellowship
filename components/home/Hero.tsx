"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Container from "@/components/layout/Container";
import HeroButtons from "./HeroButtons";

export default function Hero() {
  const [settings, setSettings] = useState({
    hero_badge: "Welcome to Lafto Mekaneysus Youth Fellowship",
    hero_title: "Growing Together in Faith, Serving Together in Love.",
    hero_subtitle: "A community where young people grow spiritually, build lifelong friendships, discover their gifts, and serve God together.",
  });

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["hero_badge", "hero_title", "hero_subtitle"]);
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((item) => { map[item.key] = item.value; });
        setSettings((prev) => ({ ...prev, ...map }));
      }
    }
    fetchSettings();
  }, []);

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-slate-100 py-12 md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-900 md:px-4 md:py-2 md:text-sm">
            {settings.hero_badge}
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 md:mt-8 md:text-5xl lg:text-6xl">
            {settings.hero_title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 md:mt-8 md:text-lg md:leading-8">
            {settings.hero_subtitle}
          </p>
          <HeroButtons />
        </div>
      </Container>
    </section>
  );
}