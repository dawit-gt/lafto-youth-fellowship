"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Event } from "@/types/event";
import Container from "@/components/layout/Container";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });
      setEvents(data || []);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 py-10 md:py-16">
      <Container>
        <div className="mb-8 text-center md:mb-10">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-[#0B3D91] md:px-4 md:text-sm">
            Events
          </span>
          <h1 className="mt-3 text-2xl font-bold text-slate-900 md:mt-4 md:text-4xl">
            Fellowship Activities
          </h1>
          <p className="mt-2 text-sm text-slate-600 md:mt-3 md:text-base">
            Everyone is welcome to worship, learn, and grow with us.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-4 md:gap-8 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border bg-white p-5 md:p-8">
                <div className="h-8 w-8 rounded-xl bg-slate-200 md:h-10 md:w-10" />
                <div className="mt-3 h-5 w-3/4 rounded bg-slate-200 md:mt-4" />
                <div className="mt-2 h-4 w-full rounded bg-slate-200 md:mt-3" />
                <div className="mt-4 space-y-2 md:mt-5 md:space-y-3">
                  <div className="h-3 w-1/2 rounded bg-slate-200 md:h-4" />
                  <div className="h-3 w-1/3 rounded bg-slate-200 md:h-4" />
                  <div className="h-3 w-2/3 rounded bg-slate-200 md:h-4" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="py-24 text-center text-slate-500">
            <p className="text-lg font-medium md:text-xl">No upcoming events</p>
            <p className="mt-2 text-sm">Check back soon for new events.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:gap-8 md:grid-cols-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-lg md:p-8"
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
    </main>
  );
}