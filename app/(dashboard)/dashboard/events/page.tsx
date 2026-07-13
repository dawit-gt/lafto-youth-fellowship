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
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="mx-auto max-w-4xl">

        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-[#0B3D91] transition"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Manage Events</h1>
          <button
            onClick={() => router.push("/dashboard/events/add")}
            className="flex items-center gap-2 rounded-xl bg-[#0B3D91] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            <Plus size={16} />
            Add Event
          </button>
        </div>

        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading...</div>
          ) : events.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No events yet.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Title</th>
                  <th className="px-6 py-3 text-left font-medium">Date</th>
                  <th className="px-6 py-3 text-left font-medium">Time</th>
                  <th className="px-6 py-3 text-left font-medium">Location</th>
                  <th className="px-6 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-medium text-slate-900">{event.title}</td>
                    <td className="px-6 py-4 text-slate-600">{event.event_date}</td>
                    <td className="px-6 py-4 text-slate-600">{event.event_time}</td>
                    <td className="px-6 py-4 text-slate-600">{event.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/dashboard/events/edit/${event.id}`)}
                          className="rounded-lg p-2 text-slate-600 hover:bg-blue-50 hover:text-[#0B3D91] transition"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id, event.title)}
                          className="rounded-lg p-2 text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}