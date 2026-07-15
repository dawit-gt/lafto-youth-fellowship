"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Container from "@/components/layout/Container";
import HeroButtons from "./HeroButtons";

export default function Hero() {
  const [settings, setSettings] = useState({
    hero_badge: "EECMY Lafto Mekaneyesus Congregation",
    hero_subtitle: "A community of young people growing together in faith, friendship, and service.",
  });

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["hero_badge", "hero_subtitle"]);
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((item) => { map[item.key] = item.value; });
        setSettings((prev) => ({ ...prev, ...map }));
      }
    }
    fetchSettings();
  }, []);

  return (
    <section className="bg-[#0B3D91] py-12 text-white md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium md:px-4 md:text-sm">
            {settings.hero_badge}
          </span>
          <h1 className="mt-4 text-2xl font-bold md:mt-6 md:text-5xl">
            ሀያላን ሠራዊት ላፍቶ መካነ ኢየሱስ ወጣቶች
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-blue-100 md:mt-6 md:text-lg">
            {settings.hero_subtitle}
          </p>
          <HeroButtons />
        </div>
      </Container>
    </section>
  );
}