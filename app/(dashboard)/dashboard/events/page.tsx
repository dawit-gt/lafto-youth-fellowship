"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Event } from "@/types/event";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";

export default function EventsAdminPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setEvents(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string, title: string) {
    const confirm = window.confirm(`Delete "${title}"? This cannot be undone.`);
    if (!confirm) return;

    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) alert("Error deleting event.");
    else setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <main className="min-h-screen bg-slate-50 py-6 px-4 md:py-10">
      <div className="mx-auto max-w-4xl">

        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-[#0B3D91] transition"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-900 md:text-2xl">Manage Events</h1>
          <button
            onClick={() => router.push("/dashboard/events/add")}
            className="flex items-center gap-2 rounded-xl bg-[#0B3D91] px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 transition md:px-4 md:text-sm"
          >
            <Plus size={14} />
            Add Event
          </button>
        </div>

        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500 text-sm">Loading...</div>
          ) : events.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">No events yet.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {events.map((event) => (
                <div key={event.id} className="p-4 md:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 md:text-base">
                        {event.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500 md:text-sm">
                        {event.event_date} · {event.event_time}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500 md:text-sm">
                        {event.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => router.push(`/dashboard/events/edit/${event.id}`)}
                        className="rounded-lg p-2 text-slate-600 hover:bg-blue-50 hover:text-[#0B3D91] transition"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id, event.title)}
                        className="rounded-lg p-2 text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}