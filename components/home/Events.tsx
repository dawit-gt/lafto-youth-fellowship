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
    <section className="bg-white py-24">
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
          <div className="grid gap-8 md:grid-cols-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl border p-8 shadow-sm transition hover:shadow-lg"
              >
                <CalendarDays className="mb-4 h-10 w-10 text-[#0B3D91]" />

                <h3 className="text-2xl font-bold text-slate-900">
                  {event.title}
                </h3>

                {event.description && (
                  <p className="mt-3 text-slate-600">{event.description}</p>
                )}

                <div className="mt-5 space-y-3 text-slate-600">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={18} />
                    {event.event_date}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock3 size={18} />
                    {event.event_time}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={18} />
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