"use client";

import { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { main } from "framer-motion/client";

export default function ContactPage() {
  const [settings, setSettings] = useState({
    contact_phone: "0950236535",
    contact_address: "Lafto, Addis Ababa, Ethiopia",
    contact_telegram: "https://t.me/+_ylPiiNclAVhZTQ0",
  });

  useEffect(() => {
    async function fetchSettings() {
      const { supabase } = await import("@/lib/supabase/client");
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["contact_phone", "contact_address", "contact_telegram"]);

      if (data) {
        const map: Record<string, string> = {};
        data.forEach((item) => {
          map[item.key] = item.value;
        });
        setSettings((prev) => ({ ...prev, ...map }));
      }
    }
    fetchSettings();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-[#0B3D91] py-12 text-white md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium md:px-4 md:text-sm">
              Contact Us
            </span>
            <h1 className="mt-4 text-2xl font-bold md:mt-6 md:text-4xl">
              Get In Touch
            </h1>
            <p className="mt-3 text-sm text-blue-100 md:mt-6 md:text-lg">
              We would love to hear from you. Reach out to us through any of the
              channels below.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-10 bg-white md:py-24">
        <Container>
          {/* Cards */}
          <div className="mx-auto max-w-3xl grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-3">
            <div className="rounded-2xl border p-5 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg md:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 md:h-14 md:w-14">
                <Phone className="h-5 w-5 text-[#0B3D91] md:h-6 md:w-6" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900 md:mt-4 md:text-base">
                Phone
              </h3>
              <p className="mt-1 text-xs text-slate-600 md:mt-2 md:text-sm">
                {settings.contact_phone}
              </p>
            </div>

            <div className="rounded-2xl border p-5 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg md:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 md:h-14 md:w-14">
                <MapPin className="h-5 w-5 text-[#0B3D91] md:h-6 md:w-6" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900 md:mt-4 md:text-base">
                Location
              </h3>
              <p className="mt-1 text-xs text-slate-600 md:mt-2 md:text-sm">
                {settings.contact_address}
              </p>
            </div>

            <div className="rounded-2xl border p-5 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg md:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 md:h-14 md:w-14">
                <MessageCircle className="h-5 w-5 text-[#0B3D91] md:h-6 md:w-6" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900 md:mt-4 md:text-base">
                Telegram
              </h3>
              <a
                href={settings.contact_telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-xs text-[#0B3D91] hover:underline md:mt-2 md:text-sm"
              >
                Join our group
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl shadow-lg md:mt-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3756.4762922493787!2d38.7427885!3d8.95177!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b83259aa2f5fd%3A0x25d7ba79eeb982c1!2sLafto%20Mekane%20Yesus%20congregation!5e1!3m2!1sen!2set!4v1784009744115!5m2!1sen!2set"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          {/* Telegram CTA */}
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-[#0B3D91] p-6 text-center text-white md:mt-12 md:p-10">
            <h2 className="text-lg font-bold md:text-2xl">
              Join Our Community
            </h2>
            <p className="mt-2 text-xs text-blue-100 md:mt-3 md:text-base">
              Stay updated with fellowship news, events, and announcements by
              joining our Telegram group.
            </p>

            <a
              href={settings.contact_telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#229ED9] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1a8dbf] transition md:mt-6 md:px-8 md:py-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 md:h-5 md:w-5"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.67l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.941z" />
              </svg>
              Join Telegram Group
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
