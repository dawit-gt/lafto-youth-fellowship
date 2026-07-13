import Container from "@/components/layout/Container";
import SectionTitle from "@/components/layout/SectionTitle";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

const events = [
  {
    title: "Weekly Bible Study",
    date: "Every Saturday",
    time: "2:00 PM",
    location: "Lafto Mekaneyesus Church",
  },
  {
    title: "Youth Worship Night",
    date: "First Friday of the Month",
    time: "6:00 PM",
    location: "Main Church Hall",
  },
];

export default function Events() {
  return (
    <section className="bg-white py-24">
      <Container>
        <SectionTitle
          badge="Upcoming Events"
          title="Join Our Fellowship Activities"
          description="Everyone is welcome to worship, learn, and grow with us."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {events.map((event) => (
            <div
              key={event.title}
              className="rounded-2xl border p-8 shadow-sm transition hover:shadow-lg"
            >
              <CalendarDays className="mb-4 h-10 w-10 text-[#0B3D91]" />

              <h3 className="text-2xl font-bold">
                {event.title}
              </h3>

              <div className="mt-5 space-y-3 text-slate-600">
                <p className="flex items-center gap-2">
                  <CalendarDays size={18} />
                  {event.date}
                </p>

                <p className="flex items-center gap-2">
                  <Clock3 size={18} />
                  {event.time}
                </p>

                <p className="flex items-center gap-2">
                  <MapPin size={18} />
                  {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}