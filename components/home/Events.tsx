"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Event } from "@/types/event";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/layout/SectionTitle";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });
      setEvents(data || []);
    }
    fetchEvents();
  }, []);

  return (
    <section className="bg-white py-12 md:py-24">
      <Container>
        <SectionTitle
          badge="Upcoming Events"
          title="Join Our Fellowship Activities"
          description="Everyone is welcome to worship, learn, and grow with us."
        />

        {events.length === 0 ? (
          <div className="text-center text-slate-500 py-12">
            No upcoming events at the moment.
          </div>
        ) : (
          <div className="grid gap-4 md:gap-8 md:grid-cols-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl border p-5 shadow-sm transition hover:shadow-lg md:p-8"
              >
                <CalendarDays className="mb-3 h-7 w-7 text-[#0B3D91] md:mb-4 md:h-10 md:w-10" />
                <h3 className="text-base font-bold text-slate-900 md:text-2xl">
                  {event.title}
                </h3>
                {event.description && (
                  <p className="mt-2 text-xs text-slate-600 md:mt-3 md:text-base">
                    {event.description}
                  </p>
                )}
                <div className="mt-3 space-y-2 text-slate-600 md:mt-5 md:space-y-3">
                  <p className="flex items-center gap-2 text-xs md:text-sm">
                    <CalendarDays size={14} />
                    {event.event_date}
                  </p>
                  <p className="flex items-center gap-2 text-xs md:text-sm">
                    <Clock3 size={14} />
                    {event.event_time}
                  </p>
                  <p className="flex items-center gap-2 text-xs md:text-sm">
                    <MapPin size={14} />
                    {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}