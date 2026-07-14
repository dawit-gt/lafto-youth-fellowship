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
    <main className="min-h-screen bg-slate-50 py-16">
      <Container>
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-[#0B3D91]">
            Events
          </span>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">
            Fellowship Activities
          </h1>
          <p className="mt-3 text-slate-600">
            Everyone is welcome to worship, learn, and grow with us.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-8 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border bg-white p-8">
                <div className="h-10 w-10 rounded-xl bg-slate-200" />
                <div className="mt-4 h-6 w-3/4 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-full rounded bg-slate-200" />
                <div className="mt-5 space-y-3">
                  <div className="h-4 w-1/2 rounded bg-slate-200" />
                  <div className="h-4 w-1/3 rounded bg-slate-200" />
                  <div className="h-4 w-2/3 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="py-24 text-center text-slate-500">
            <p className="text-xl font-medium">No upcoming events</p>
            <p className="mt-2 text-sm">Check back soon for new events.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl border bg-white p-8 shadow-sm transition hover:shadow-lg"
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
    </main>
  );
}